import { NextResponse } from 'next/server';
import { sendSMS, sendWhatsApp } from '@/lib/twilio';
import { sendEmail, createBloodRequestEmail } from '@/lib/email';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all';
    const email = searchParams.get('email') || process.env.EMAIL_USER;
    const phone = searchParams.get('phone') || process.env.TWILIO_PHONE_NUMBER;
    
    console.log(`Testing notifications (type: ${type})`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone}`);
    
    const results: Record<string, any> = {};
    
    // Test email
    if (type === 'all' || type === 'email') {
      try {
        const emailHtml = createBloodRequestEmail('Test Donor', {
          patientName: 'Test Patient',
          bloodGroup: 'A+',
          hospital: 'Test Hospital',
          city: 'Test City',
          contactNumber: phone || '1234567890'
        });
        
        const emailResult = await sendEmail(
          email,
          'Test Blood Request Email',
          emailHtml
        );
        
        results.email = {
          success: true,
          messageId: emailResult.messageId
        };
      } catch (error) {
        console.error('Email test failed:', error);
        results.email = {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    }
    
    // Test SMS
    if (type === 'all' || type === 'sms') {
      try {
        const smsResult = await sendSMS(
          phone,
          'Test SMS from Emergency Medical Blood Donation System'
        );
        
        results.sms = {
          success: true,
          sid: smsResult.sid
        };
      } catch (error) {
        console.error('SMS test failed:', error);
        results.sms = {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    }
    
    // Test WhatsApp
    if (type === 'all' || type === 'whatsapp') {
      try {
        const whatsappResult = await sendWhatsApp(
          phone,
          'Test WhatsApp message from Emergency Medical Blood Donation System'
        );
        
        results.whatsapp = {
          success: true,
          sid: whatsappResult.sid
        };
      } catch (error) {
        console.error('WhatsApp test failed:', error);
        results.whatsapp = {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    }
    
    return NextResponse.json({
      success: true,
      results
    });
  } catch (error) {
    console.error('Notification test error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
} 