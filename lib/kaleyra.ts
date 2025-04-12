import axios from 'axios';

const KALEYRA_API_KEY = process.env.KALEYRA_API_KEY;
const KALEYRA_SENDER_ID = process.env.KALEYRA_SENDER_ID;
const KALEYRA_BASE_URL = 'https://api.kaleyra.io/v1';

export async function sendWhatsApp(to: string, message: string) {
  try {
    // Ensure the phone number is in E.164 format
    const formattedNumber = to.startsWith('+') ? to : `+${to}`;
    
    console.log('Sending WhatsApp message via Kaleyra:', {
      to: formattedNumber,
      from: KALEYRA_SENDER_ID,
      message: message
    });

    const response = await axios.post(
      `${KALEYRA_BASE_URL}/messages`,
      {
        to: formattedNumber,
        type: 'text',
        channel: 'whatsapp',
        sender: KALEYRA_SENDER_ID,
        body: message
      },
      {
        headers: {
          'api-key': KALEYRA_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('WhatsApp message sent successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending WhatsApp message:', error.response?.data || error.message);
    throw new Error(`Failed to send WhatsApp message: ${error.response?.data?.message || error.message}`);
  }
} 