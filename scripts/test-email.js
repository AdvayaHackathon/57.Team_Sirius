// Simple script to test email functionality
require('dotenv').config();
const nodemailer = require('nodemailer');

// Create a transporter with Gmail settings
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  }
});

// Verify the connection configuration
console.log('Testing email configuration...');
transporter.verify(function(error, success) {
  if (error) {
    console.error('Email configuration error:', error);
    process.exit(1);
  } else {
    console.log('Email server is ready to send messages');
    
    // Send a test email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: 'Test Email from Emergency Medical App',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">Test Email</h2>
          <p>This is a test email from the Emergency Medical app.</p>
          <p>If you received this email, the email notification system is working correctly.</p>
          <p>Time sent: ${new Date().toLocaleString()}</p>
        </div>
      `
    };

    console.log('Sending test email...');
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        process.exit(1);
      } else {
        console.log('Email sent successfully!');
        console.log('Message ID:', info.messageId);
        process.exit(0);
      }
    });
  }
}); 