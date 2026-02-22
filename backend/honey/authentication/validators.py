import re
from django.core.exceptions import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken


def validate_password_uppercase(value):
    if not any(char.isupper() for char in value):
        raise ValidationError("Password must contain at least one uppercase letter.")


def validate_tokens(refresh_token, access_token):
    try:
        AccessToken(access_token)
        RefreshToken(refresh_token)
        return True
    except Exception:
        return False


COUNTRIES = [
    {"code": "UZ", "name": "O'zbekiston", "dial": "+998", "subscriber_length": 9},
    {"code": "RU", "name": "Rossiya", "dial": "+7", "subscriber_length": 10},
    {"code": "KZ", "name": "Qozog'iston", "dial": "+7", "subscriber_length": 10},
    {"code": "US", "name": "AQSH", "dial": "+1", "subscriber_length": 10},
    {"code": "TR", "name": "Turkiya", "dial": "+90", "subscriber_length": 10},
    {"code": "KG", "name": "Qirg'iziston", "dial": "+996", "subscriber_length": 9},
]


def _allowed_countries_message():
    parts = [f"{c['name']} ({c['dial']}), length={c['subscriber_length']}" for c in COUNTRIES]
    return "Allowed formats: " + ", ".join(parts)


def validate_phone_number(value: str) -> str:
    if not isinstance(value, str):
        raise ValidationError("Phone number must be a string. " + _allowed_countries_message())
    if not re.fullmatch(r'^\+\d{1,15}$', value):
        raise ValidationError(
            "Phone number must start with '+' and contain digits only. " + _allowed_countries_message())
    sorted_dials = sorted({c['dial'] for c in COUNTRIES}, key=lambda s: -len(s))
    for dial in sorted_dials:
        if value.startswith(dial):
            subscriber = value[len(dial):]
            candidates = [c for c in COUNTRIES if c['dial'] == dial]
            if not subscriber.isdigit():
                raise ValidationError("Phone number contains invalid characters. " + _allowed_countries_message())

            for cand in candidates:
                if len(subscriber) == cand['subscriber_length']:
                    return value

            allowed_lengths = sorted(set(c['subscriber_length'] for c in candidates))
            raise ValidationError(
                f"Phone number for country code {dial} must have subscriber length of "
                f"{' or '.join(str(x) for x in allowed_lengths)} digits after the code. "
                f"Got {len(subscriber)}. " + _allowed_countries_message()
            )
    raise ValidationError(
        "Phone number must start with one of the allowed country codes. " + _allowed_countries_message())
