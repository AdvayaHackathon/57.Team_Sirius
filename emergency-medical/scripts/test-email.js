// Test script for email sending functionality
require('dotenv').config();
const nodemailer = require('nodemailer');

// Create email transporter for testing
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  }
});

// Verify email configuration
async function verifyEmailConfig() {
  try {
    console.log('Verifying email configuration...');
    console.log(`Email User: ${process.env.EMAIL_USER}`);
    console.log(`Email Password: ${process.env.EMAIL_APP_PASSWORD ? 'Set' : 'Not set'}`);
    
    await transporter.verify();
    console.log('✅ Email configuration is valid!');
    return true;
  } catch (error) {
    console.error('❌ Email configuration error:', error);
    return false;
  }
}

async function testEmail() {
  try {
    console.log('\n=== Testing Email System ===\n');

    // First verify email configuration
    const emailConfigValid = await verifyEmailConfig();
    if (!emailConfigValid) {
      throw new Error('Email configuration is invalid. Please check your .env file.');
    }

    // Test email data
    const testEmail = {
      to: process.env.EMAIL_USER,
      subject: 'Test Email from Emergency Medical',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">Test Email</h2>
          <p>This is a test email from the Emergency Medical Blood Donation System.</p>
          <p>If you received this email, your email configuration is working correctly!</p>
          <br>
          <p>Best regards,</p>
          <p>Emergency Medical Team</p>
        </div>
      `
    };

    console.log('Sending test email...');
    console.log(`To: ${testEmail.to}`);
    console.log(`Subject: ${testEmail.subject}`);

    // Send the test email
    const info = await transporter.sendMail({
      from: `"Emergency Medical" <${process.env.EMAIL_USER}>`,
      to: testEmail.to,
      subject: testEmail.subject,
      html: testEmail.html
    });

    console.log('\n✅ Test email sent successfully!');
    console.log(`Message ID: ${info.messageId}`);
    console.log(`Response: ${info.response}`);

    console.log('\n=== Test Complete ===');
  } catch (error) {
    console.error('\n❌ Error in test:', error);
    console.error('\nTroubleshooting tips:');
    console.error('1. Verify your email credentials in .env file');
    console.error('2. Make sure you have "Less secure app access" enabled in your Google account');
    console.error('3. If using 2FA, make sure you\'re using an App Password');
    process.exit(1);
  }
}

// Run the test
testEmail(); 