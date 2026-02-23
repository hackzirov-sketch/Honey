import os
import django
from django.core.mail import send_mail
from django.conf import settings

# Django sozlamalarini yuklash
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

def send_test_email():
    subject = 'HoneyFull Test Email'
    message = 'Salom! Bu HoneyFull loyihasidan yuborilgan test xabar.'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = ['ahmadjonzokirov54@gmail.com']
    
    print(f"Emaill yuborilmoqda: {email_from} -> {recipient_list}")
    try:
        sent = send_mail(subject, message, email_from, recipient_list)
        if sent:
            print("✅ Email muvaffaqiyatli yuborildi!")
        else:
            print("❌ Email yuborilmadi (send_mail 0 qaytardi).")
    except Exception as e:
        print(f"❌ Xatolik yuz berdi: {str(e)}")

if __name__ == "__main__":
    send_test_email()
