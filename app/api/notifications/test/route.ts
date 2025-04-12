import { NextResponse } from 'next/server';
import { sendSMS, sendWhatsApp } from '../../../lib/twilio';
import { sendEmail } from '../../../lib/email';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get('phone');
    const email = searchParams.get('email');
    
    if (!phone && !email) {
      return NextResponse.json(
        { error: 'Missing phone or email parameter' },
        { status: 400 }
      );
    }
    
    const results: any = {};
    
    // Test WhatsApp notification
    if (phone) {
      try {
        const message = 'This is a test notification from the Emergency Medical app.';
        const response = await sendWhatsApp(phone, message);
        results.whatsapp = { success: true, messageId: response.sid };
      } catch (error: any) {
        results.whatsapp = { success: false, error: error.message };
      }
    }
    
    // Test email notification
    if (email) {
      try {
        const html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #dc2626;">Test Email Notification</h2>
            <p>This is a test email from the Emergency Medical app.</p>
            <p>If you received this email, the email notification system is working correctly.</p>
          </div>
        `;
        
        const response = await sendEmail(
          email,
          'Test Email Notification',
          html
        );
        
        results.email = { success: true, messageId: response.messageId };
      } catch (error: any) {
        results.email = { success: false, error: error.message };
      }
    }
    
    return NextResponse.json(results);
  } catch (error: any) {
    console.error('Error in test endpoint:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send test notifications' },
      { status: 500 }
    );
  }
} 