// Test script for blood request email sending
require('dotenv').config();
const fetch = require('node-fetch');
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

async function testBloodRequest() {
  try {
    console.log('\n=== Testing Blood Request Email System ===\n');

    // First verify email configuration
    const emailConfigValid = await verifyEmailConfig();
    if (!emailConfigValid) {
      throw new Error('Email configuration is invalid. Please check your .env file.');
    }

    // Test blood request data
    const testRequest = {
      patient_name: 'Test Patient',
      blood_group: 'A+',
      units_required: 2,
      hospital_name: 'Test Hospital',
      hospital_address: '123 Test Street',
      city: 'Test City',
      state_id: 1, // Replace with a valid state ID from your database
      district_id: 1, // Replace with a valid district ID from your database
      contact_name: 'Test Contact',
      contact_phone: '+911234567890',
      contact_email: process.env.EMAIL_USER,
      urgency_level: 'high',
      additional_notes: 'This is a test blood request'
    };

    console.log('Sending test blood request...');
    console.log('Request details:', JSON.stringify(testRequest, null, 2));

    // Send the blood request
    const response = await fetch('http://localhost:3000/api/blood-requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testRequest)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(`Blood request failed: ${result.error || response.statusText}`);
    }

    console.log('\n✅ Blood request created successfully!');
    console.log('Response:', JSON.stringify(result, null, 2));
    console.log(`\nNumber of donors notified: ${result.notificationsSent}`);

    if (result.notificationsSent === 0) {
      console.log('\n⚠️ Warning: No compatible donors found in the specified location.');
      console.log('Tips:');
      console.log('1. Make sure there are donors registered in the database');
      console.log('2. Check if the stateId and districtId match existing donors');
      console.log('3. Verify that there are donors with compatible blood groups');
    } else {
      console.log('\n✅ Emails should have been sent to all compatible donors.');
      console.log('Please check your email for the test notification.');
    }

    console.log('\n=== Test Complete ===');
  } catch (error) {
    console.error('\n❌ Error in test:', error);
    console.error('\nTroubleshooting tips:');
    console.error('1. Make sure your Next.js server is running (npm run dev)');
    console.error('2. Verify your email credentials in .env file');
    console.error('3. Check if there are compatible donors in the database');
    process.exit(1);
  }
}

// Run the test
testBloodRequest(); 