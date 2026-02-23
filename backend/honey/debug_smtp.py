import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

load_dotenv()

def debug_smtp():
    host = os.getenv("EMAIL_HOST", "smtp.gmail.com")
    port = int(os.getenv("EMAIL_PORT", "587"))
    user = os.getenv("EMAIL_HOST_USER")
    password = "kaxludlkwtmfwfeg" # Direct test with new password
    recipient = "ahmadjonzokirov54@gmail.com"

    print(f"Connecting to {host}:{port} as {user}...")

    try:
        server = smtplib.SMTP(host, port)
        server.set_debuglevel(1)
        server.starttls()
        print("Logging in...")
        server.login(user, password)
        
        msg = MIMEMultipart()
        msg['From'] = user
        msg['To'] = recipient
        msg['Subject'] = "SMTP Debug Test"
        msg.attach(MIMEText("This is a direct SMTP test message.", 'plain'))
        
        server.send_message(msg)
        print("✅ Message sent!")
        server.quit()
    except Exception as e:
        print(f"❌ SMTP Error: {e}")

if __name__ == "__main__":
    debug_smtp()
