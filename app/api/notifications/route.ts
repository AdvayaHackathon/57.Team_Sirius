import { NextResponse } from 'next/server';
import { sendSMS, sendWhatsApp } from '@/lib/twilio';

export async function POST(request: Request) {
  try {
    const { to, message, type } = await request.json();

    if (!to || !message || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let response;
    if (type === 'whatsapp') {
      response = await sendWhatsApp(to, message);
    } else if (type === 'sms') {
      response = await sendSMS(to, message);
    } else {
      return NextResponse.json(
        { error: 'Invalid notification type' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, messageId: response.sid });
  } catch (error: any) {
    console.error('Error sending notification:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send notification' },
      { status: 500 }
    );
  }
} 