#!/bin/sh
set -e

: "${POSTGRES_HOST}"
: "${POSTGRES_PORT}"
: "${REDIS_HOST}"
: "${REDIS_PORT}"
: "${DJANGO_ASGI_MODULE}"

echo "Waiting for Postgres at ${POSTGRES_HOST}:${POSTGRES_PORT}..."
while ! nc -z "$POSTGRES_HOST" "$POSTGRES_PORT"; do
  sleep 1
done
echo "Postgres is up!"

echo "Waiting for Redis at ${REDIS_HOST}:${REDIS_PORT}..."
while ! nc -z "$REDIS_HOST" "$REDIS_PORT"; do
  sleep 1
done
echo "Redis is up!"

mkdir -p /vol/web/static
mkdir -p /vol/web/media

echo "Running migrations..."
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Starting Daphne (ASGI) server..."
exec daphne -b 0.0.0.0 -p 8000 "${DJANGO_ASGI_MODULE}"
