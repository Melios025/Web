from django.core.mail import send_mail

def send_email_SMTP(subject, message, recipient):
   sender= "sieuthanthu025@gmail.com"
   send_mail(subject, message, sender, recipient)

