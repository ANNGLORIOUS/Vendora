from django.conf import settings
from .models import SMSHistory

def send_sms_via_africastalking(to, message):
    try:
        import africastalking
        username = settings.AFRICASTALKING_USERNAME
        api_key = settings.AFRICASTALKING_APIKEY
        africastalking.initialize(username, api_key)
        sms = africastalking.SMS
        response = sms.send(message, [to])
        # response example: {'SMSMessageData': {'Recipients': [ ... ]}}
        recipients = response.get('SMSMessageData', {}).get('Recipients', [])
        provider_ref = ''
        status = 'sent'
        if recipients:
            provider_ref = recipients[0].get('messageId', '')
            status = recipients[0].get('status', 'sent')
        return {'status': status, 'provider_reference': provider_ref, 'raw': response}
    except Exception as exc:
        return {'status': 'failed', 'error': str(exc)}


def send_sms(customer, message, amount=None):
    # Customer phone expected in E.164 or provider format
    result = send_sms_via_africastalking(customer.phone, message)
    history = SMSHistory.objects.create(
        customer=customer,
        message=message,
        amount=amount,
        status=result.get('status', 'pending'),
        provider_reference=result.get('provider_reference', '')
    )
    return history, result
