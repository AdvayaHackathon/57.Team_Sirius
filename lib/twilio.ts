import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER;

const client = twilio(accountSid, authToken);

export async function sendSMS(to: string, message: string) {
  try {
    // Ensure the phone number is in E.164 format
    const formattedNumber = to.startsWith('+') ? to : `+${to}`;
    
    console.log('Sending SMS via Twilio:', {
      to: formattedNumber,
      from: twilioPhoneNumber,
      message: message
    });

    const response = await client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: formattedNumber
    });

    console.log('SMS sent successfully:', response.sid);
    return response;
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw new Error(`Failed to send SMS: ${error.message}`);
  }
}

export async function sendWhatsApp(to: string, message: string) {
  try {
    // Log the original phone number
    console.log('Original phone number:', to);
    
    // Clean the phone number - remove any non-digit characters
    let cleanNumber = to.replace(/\D/g, '');
    console.log('Cleaned phone number:', cleanNumber);
    
    // Remove leading zeros
    cleanNumber = cleanNumber.replace(/^0+/, '');
    console.log('After removing leading zeros:', cleanNumber);
    
    // Remove country code if present
    if (cleanNumber.startsWith('91')) {
      cleanNumber = cleanNumber.substring(2);
      console.log('After removing country code:', cleanNumber);
    }
    
    // Add country code if not present
    if (!cleanNumber.startsWith('91')) {
      cleanNumber = `91${cleanNumber}`;
      console.log('After adding country code:', cleanNumber);
    }
    
    // Format for WhatsApp
    const formattedNumber = `whatsapp:+${cleanNumber}`;
    console.log('Final formatted number for WhatsApp:', formattedNumber);
    
    // Format the Twilio WhatsApp number
    const formattedFromNumber = `whatsapp:${twilioWhatsAppNumber}`;
    console.log('Formatted Twilio WhatsApp number:', formattedFromNumber);
    
    console.log('Sending WhatsApp message:', {
      to: formattedNumber,
      from: formattedFromNumber,
      message: message
    });

    const response = await client.messages.create({
      body: message,
      from: formattedFromNumber,
      to: formattedNumber
    });

    console.log('WhatsApp message sent successfully:', response.sid);
    return response;
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    throw new Error(`Failed to send WhatsApp message: ${error.message}`);
  }
} 