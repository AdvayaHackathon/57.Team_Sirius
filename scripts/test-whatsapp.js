// Simple script to test WhatsApp functionality
require('dotenv').config();
const twilio = require('twilio');

// Get Twilio credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER;

// Create Twilio client
const client = twilio(accountSid, authToken);

// Function to format phone number for WhatsApp
function formatPhoneNumber(phone) {
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
  
  // Add country code if not present
  if (!cleanNumber.startsWith('91')) {
    cleanNumber = `91${cleanNumber}`;
    console.log('After adding country code:', cleanNumber);
  }
  
  // Format for WhatsApp
  const formattedNumber = `whatsapp:+${cleanNumber}`;
  console.log('Final formatted number for WhatsApp:', formattedNumber);
  
  return formattedNumber;
}

// Function to send WhatsApp message
async function sendWhatsAppMessage(to, message) {
  try {
    // Format the phone number
    const formattedNumber = formatPhoneNumber(to);
    
    // Format the Twilio WhatsApp number
    const formattedFromNumber = `whatsapp:${twilioWhatsAppNumber}`;
    console.log('Formatted Twilio WhatsApp number:', formattedFromNumber);
    
    console.log('Sending WhatsApp message:', {
      to: formattedNumber,
      from: formattedFromNumber,
      message: message
    });

    // Send the message
    const response = await client.messages.create({
      body: message,
      from: formattedFromNumber,
      to: formattedNumber
    });

    console.log('WhatsApp message sent successfully!');
    console.log('Message SID:', response.sid);
    return response;
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    throw error;
  }
}

// Get phone number from command line arguments
const phoneNumber = process.argv[2];
if (!phoneNumber) {
  console.error('Please provide a phone number as a command line argument');
  console.error('Usage: node test-whatsapp.js <phone-number>');
  process.exit(1);
}

// Send test message
const message = 'This is a test WhatsApp message from the Emergency Medical app.';
console.log('Testing WhatsApp functionality...');
sendWhatsAppMessage(phoneNumber, message)
  .then(() => {
    console.log('Test completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Test failed:', error);
    process.exit(1);
  }); 