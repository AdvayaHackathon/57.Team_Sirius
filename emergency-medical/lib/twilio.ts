// This file is deprecated - Twilio operations moved to API routes
// See app/api/notifications/route.ts for new implementation

import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

if (!accountSid || !authToken || !twilioPhoneNumber) {
  throw new Error('Missing Twilio credentials');
}

// Create Twilio client
const client = twilio(accountSid, authToken);

// Function to format phone number for WhatsApp
function formatPhoneNumber(phone: string): string {
  console.log('Original phone number:', phone);
  
  // Clean the phone number - remove any non-digit characters
  let cleanNumber = phone.replace(/\D/g, '');
  console.log('Cleaned phone number:', cleanNumber);
  
  // Remove leading zeros
  cleanNumber = cleanNumber.replace(/^0+/, '');
  console.log('After removing leading zeros:', cleanNumber);
  
  // Remove India country code if present
  cleanNumber = cleanNumber.replace(/^91/, '');
  console.log('After removing India country code:', cleanNumber);
  
  // Add India country code
  cleanNumber = `+91${cleanNumber}`;
  console.log('Final formatted number for WhatsApp:', cleanNumber);
  
  return cleanNumber;
}

/**
 * Send an SMS message using Twilio
 * @param to - The recipient's phone number (in E.164 format)
 * @param message - The message to send
 * @returns Promise with the message details
 */
export async function sendSMS(to: string, message: string): Promise<any> {
  try {
    console.log(`Sending SMS to ${to}...`);
    
    const response = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to
    });
    
    console.log(`SMS sent successfully! SID: ${response.sid}`);
    return response;
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw error;
  }
}

/**
 * Send a WhatsApp message using Twilio
 * @param to - The recipient's phone number (in E.164 format)
 * @param message - The message to send
 * @returns Promise with the message details
 */
export async function sendWhatsApp(to: string, message: string): Promise<any> {
  try {
    console.log(`Sending WhatsApp message to ${to}...`);
    
    const response = await client.messages.create({
      body: message,
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${to}`
    });
    
    console.log(`WhatsApp message sent successfully! SID: ${response.sid}`);
    return response;
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    throw error;
  }
}
