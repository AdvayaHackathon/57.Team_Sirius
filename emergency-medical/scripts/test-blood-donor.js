// Test script for blood donor registration
require('dotenv').config();
const fetch = require('node-fetch');
const nodemailer = require('nodemailer');

// Create email transporter for testing
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
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

async function testBloodDonorRegistration() {
  try {
    console.log('\n=== Testing Blood Donor Registration System ===\n');

    // First verify email configuration
    const emailConfigValid = await verifyEmailConfig();
    if (!emailConfigValid) {
      throw new Error('Email configuration is invalid. Please check your .env file.');
    }

    // Test donor data
    const testDonor = {
      name: 'Test Donor',
      email: process.env.EMAIL_USER,
      phone: '+911234567890',
      blood_group: 'A+',
      age: 25,
      gender: 'male',
      state_id: 1, // Replace with a valid state ID from your database
      district_id: 1, // Replace with a valid district ID from your database
      last_donation_date: null,
      is_active: true
    };

    console.log('Registering test donor...');
    console.log('Donor details:', JSON.stringify(testDonor, null, 2));

    // Send the donor registration request
    const response = await fetch('http://localhost:3000/api/blood-donors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testDonor)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(`Donor registration failed: ${result.error || response.statusText}`);
    }

    console.log('\n✅ Donor registered successfully!');
    console.log('Response:', JSON.stringify(result, null, 2));

    // Test email sending
    console.log('\nTesting welcome email...');
    try {
      const info = await transporter.sendMail({
        from: `"Emergency Medical" <${process.env.EMAIL_USER}>`,
        to: testDonor.email,
        subject: 'Welcome to Emergency Medical Blood Donation System',
        html: `
          <h1>Welcome ${testDonor.name}!</h1>
          <p>Thank you for registering as a blood donor.</p>
          <p>Your details:</p>
          <ul>
            <li>Blood Group: ${testDonor.blood_group}</li>
            <li>Phone: ${testDonor.phone}</li>
          </ul>
          <p>We will notify you when there is a blood request matching your blood group in your area.</p>
        `
      });
      console.log('✅ Welcome email sent successfully!');
      console.log('Message ID:', info.messageId);
    } catch (error) {
      console.error('❌ Failed to send welcome email:', error.message);
    }

    console.log('\n=== Test Complete ===');
  } catch (error) {
    console.error('\n❌ Error in test:', error);
    console.error('\nTroubleshooting tips:');
    console.error('1. Make sure your Next.js server is running (npm run dev)');
    console.error('2. Verify your email credentials in .env file');
    console.error('3. Check if the stateId and districtId are valid');
    process.exit(1);
  }
}

// Run the test
testBloodDonorRegistration(); 