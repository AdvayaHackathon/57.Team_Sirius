import twilio from 'twilio';
import { sendEmail } from './email';

// Initialize Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER;

if (!accountSid || !authToken || !twilioPhoneNumber || !twilioWhatsAppNumber) {
  throw new Error('Missing Twilio credentials');
}

const client = twilio(accountSid, authToken);

// Function to format phone number
function formatPhoneNumber(phone: string): string {
  console.log('Original phone number:', phone);
  
  // Clean the phone number - remove any non-digit characters
  let cleanNumber = phone.replace(/\D/g, '');
  console.log('Cleaned phone number:', cleanNumber);
  
  // Remove leading zeros
  cleanNumber = cleanNumber.replace(/^0+/, '');
  console.log('After removing leading zeros:', cleanNumber);
  
  // Remove country code if present
  if (cleanNumber.startsWith('91')) {
    cleanNumber = cleanNumber.substring(2);
    console.log('After removing country code:', cleanNumber);
  }
  
  // Add country code
  cleanNumber = `+91${cleanNumber}`;
  console.log('Final formatted number:', cleanNumber);
  
  return cleanNumber;
}

/**
 * Send an SMS message
 * @param to - The recipient's phone number
 * @param message - The message to send
 */
export async function sendSMS(to: string, message: string) {
  try {
    const formattedNumber = formatPhoneNumber(to);
    console.log('Sending SMS to:', formattedNumber);
    
    const response = await client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: formattedNumber
    });
    
    console.log('SMS sent successfully:', response.sid);
    return response;
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw error;
  }
}

/**
 * Send a WhatsApp message
 * @param to - The recipient's phone number
 * @param message - The message to send
 */
export async function sendWhatsApp(to: string, message: string) {
  try {
    const formattedNumber = formatPhoneNumber(to);
    const whatsappTo = `whatsapp:${formattedNumber}`;
    const whatsappFrom = `whatsapp:${twilioWhatsAppNumber}`;
    
    console.log('Sending WhatsApp message to:', whatsappTo);
    
    const response = await client.messages.create({
      body: message,
      from: whatsappFrom,
      to: whatsappTo
    });
    
    console.log('WhatsApp message sent successfully:', response.sid);
    return response;
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    throw error;
  }
}

/**
 * Send a notification (email, SMS, or WhatsApp)
 * @param type - The type of notification ('email', 'sms', or 'whatsapp')
 * @param to - The recipient's contact information (email or phone number)
 * @param message - The message to send
 * @param subject - The email subject (required for email notifications)
 * @param html - The email HTML content (required for email notifications)
 */
export async function sendNotification(
  type: 'email' | 'sms' | 'whatsapp',
  to: string,
  message: string,
  subject?: string,
  html?: string
) {
  try {
    switch (type) {
      case 'email':
        if (!subject || !html) {
          throw new Error('Subject and HTML content are required for email notifications');
        }
        return await sendEmail(to, subject, html);
      
      case 'sms':
        return await sendSMS(to, message);
      
      case 'whatsapp':
        return await sendWhatsApp(to, message);
      
      default:
        throw new Error('Invalid notification type');
    }
  } catch (error) {
    console.error(`Error sending ${type} notification:`, error);
    throw error;
  }
} 