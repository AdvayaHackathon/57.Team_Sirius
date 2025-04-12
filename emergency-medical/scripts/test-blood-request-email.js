// Test script for blood request email functionality
require('dotenv').config();
const fetch = require('node-fetch');

async function testBloodRequestEmail() {
  try {
    console.log('\n=== Testing Blood Request Email System ===\n');

    // Test blood request data
    const testRequest = {
      patient_name: 'Test Patient',
      blood_group: 'A+',
      units_required: 2,
      hospital: 'Test Hospital',
      contact_number: '+911234567890',
      state_id: 1, // Replace with a valid state ID from your database
      district_id: 1, // Replace with a valid district ID from your database
      required_by: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]
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
    if (result.notificationsFailed > 0) {
      console.log(`Failed notifications: ${result.notificationsFailed}`);
    }

    console.log('\n=== Test Complete ===');
  } catch (error) {
    console.error('\n❌ Error in test:', error);
    console.error('\nTroubleshooting tips:');
    console.error('1. Make sure your Next.js server is running');
    console.error('2. Verify your email configuration in .env file');
    console.error('3. Check that you have compatible blood donors in your database');
    process.exit(1);
  }
}

// Run the test
testBloodRequestEmail(); 