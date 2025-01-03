from django.core.mail import send_mail

def send_email_SMTP(subject, message, recipient, html_message=None):
    sender = "sieuthanthu025@gmail.com"
    try:
        send_mail(
            subject=subject,
            message=message,  # Nội dung dạng text
            from_email=sender,
            recipient_list=recipient,  # Danh sách người nhận
            fail_silently=False,
            html_message=html_message,  # Nội dung HTML
        )
        return "Email sent successfully!"
    except Exception as e:
        return f"Error: {str(e)}"