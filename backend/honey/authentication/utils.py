import random
import logging
from datetime import timedelta
from django.utils.timezone import now
from django.core.mail import send_mail
from django.conf import settings

logger = logging.getLogger(__name__)


def generate_code():
    # 6 xonali tasdiqlash kodi
    return random.randint(100000, 999999)


def send_verification_email(user, code):
    # Kod email headingda (subject) ham ko'rinadi
    subject = f"🍯 Tasdiqlash kodi: {code} — Honey Ecosystem"
    message = (
        f"Salom, {user.username}!\n\n"
        f"━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
        f"  Tasdiqlash kodingiz:\n\n"
        f"        {code}\n\n"
        f"━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n"
        f"Kod 10 daqiqa davomida amal qiladi.\n\n"
        f"Agar siz ro'yxatdan o'tmagan bo'lsangiz,\n"
        f"ushbu xabarni e'tiborsiz qoldiring.\n\n"
        f"— Honey Ecosystem jamoasi 🍯"
    )
    try:
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
            fail_silently=False,
        )
        logger.info(f"Verification email sent to {user.email}")
    except Exception as e:
        logger.warning(f"Email yuborilmadi ({user.email}): {e}")


def generate_expiry_time():
    return now() + timedelta(minutes=10)