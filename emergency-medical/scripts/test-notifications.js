require('dotenv').config();
const fetch = require('node-fetch');
const nodemailer = require('nodemailer');

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

// Test email template
const testEmailHtml = `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #dc2626;
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 5px 5px 0 0;
        }
        .content {
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 0 0 5px 5px;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          font-size: 0.9em;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Test Email Notification</h1>
      </div>
      <div class="content">
        <p>This is a test email to verify the email notification system is working correctly.</p>
        <p>If you received this email, the email notification system is functioning properly.</p>
        <p>Time sent: ${new Date().toLocaleString()}</p>
      </div>
      <div class="footer">
        <p>This is an automated test message from the Emergency Medical Blood Donation System.</p>
      </div>
    </body>
  </html>
`;

// Test SMS message
const testSmsMessage = `Test SMS Notification\nTime: ${new Date().toLocaleString()}\nThis is a test message to verify the SMS notification system.`;

async function sendEmail(to, subject, html) {
  try {
    const info = await transporter.sendMail({
      from: `"Emergency Medical" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log('Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

async function testNotifications() {
  console.log('Testing notification systems...');
  
  // Test direct email sending
  console.log('\nTesting direct email sending...');
  try {
    await sendEmail(
      process.env.EMAIL_USER,
      'Test Email Notification (Direct)',
      testEmailHtml
    );
    console.log('✅ Direct email sent successfully');
  } catch (error) {
    console.error('❌ Direct email sending failed:', error.message);
  }
  
  // Test email API route
  console.log('\nTesting email API route...');
  try {
    const emailResponse = await fetch('http://localhost:3000/api/notifications/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: process.env.EMAIL_USER,
        subject: 'Test Email Notification (API)',
        html: testEmailHtml
      })
    });
    
    const emailResult = await emailResponse.json();
    if (emailResponse.ok) {
      console.log('✅ Email API route test successful:', emailResult);
    } else {
      console.error('❌ Email API route test failed:', emailResult);
    }
  } catch (error) {
    console.error('❌ Email API route test error:', error.message);
  }
  
  // Test SMS/WhatsApp API route
  console.log('\nTesting SMS/WhatsApp API route...');
  try {
    const smsResponse = await fetch('http://localhost:3000/api/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'sms',
        to: process.env.TWILIO_PHONE_NUMBER,
        message: testSmsMessage
      })
    });
    
    const smsResult = await smsResponse.json();
    if (smsResponse.ok) {
      console.log('✅ SMS/WhatsApp API route test successful:', smsResult);
    } else {
      console.error('❌ SMS/WhatsApp API route test failed:', smsResult);
    }
  } catch (error) {
    console.error('❌ SMS/WhatsApp API route test error:', error.message);
  }
  
  // Test blood request notification
  console.log('\nTesting blood request notification...');
  try {
    const bloodRequestResponse = await fetch('http://localhost:3000/api/blood-requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patientName: 'Test Patient',
        bloodGroup: 'O+',
        hospitalName: 'Test Hospital',
        hospitalAddress: '123 Test Street',
        stateId: '1', // Replace with a valid state ID from your database
        districtId: '1', // Replace with a valid district ID from your database
        contactName: 'Test Contact',
        contactPhone: process.env.TWILIO_PHONE_NUMBER,
        requiredUnits: 1,
        urgency: 'normal',
        additionalNotes: 'This is a test blood request'
      })
    });
    
    const bloodRequestResult = await bloodRequestResponse.json();
    if (bloodRequestResponse.ok) {
      console.log('✅ Blood request test successful:', bloodRequestResult);
    } else {
      console.error('❌ Blood request test failed:', bloodRequestResult);
    }
  } catch (error) {
    console.error('❌ Blood request test error:', error.message);
  }
  
  console.log('\nNotification tests completed!');
}

testNotifications().catch(console.error); 