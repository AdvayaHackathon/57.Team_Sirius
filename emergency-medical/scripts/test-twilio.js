require('dotenv').config();
const twilio = require('twilio');

async function testTwilioConnection() {
  console.log('Testing Twilio connection...');
  
  // Check if environment variables are set
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
  const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER;
  
  if (!accountSid || !authToken || !twilioPhoneNumber || !twilioWhatsAppNumber) {
    console.error('Missing Twilio environment variables. Please check your .env file.');
    console.log('Required variables:');
    console.log('- TWILIO_ACCOUNT_SID');
    console.log('- TWILIO_AUTH_TOKEN');
    console.log('- TWILIO_PHONE_NUMBER');
    console.log('- TWILIO_WHATSAPP_NUMBER');
    return;
  }
  
  console.log('Environment variables found. Creating Twilio client...');
  
  try {
    // Create Twilio client
    const client = twilio(accountSid, authToken);
    
    // Test connection by fetching account info
    console.log('Testing connection by fetching account info...');
    const account = await client.api.accounts(accountSid).fetch();
    
    console.log('Connection successful!');
    console.log('Account status:', account.status);
    console.log('Account friendly name:', account.friendlyName);
    
    // Test DNS resolution
    console.log('\nTesting DNS resolution...');
    const dns = require('dns');
    
    dns.lookup('api.twilio.com', (err, address, family) => {
      if (err) {
        console.error('DNS lookup failed:', err);
      } else {
        console.log('DNS lookup successful!');
        console.log('IP address:', address);
        console.log('IP family:', family);
      }
    });
    
    // Test network connectivity
    console.log('\nTesting network connectivity...');
    const https = require('https');
    
    const options = {
      hostname: 'api.twilio.com',
      port: 443,
      path: '/',
      method: 'HEAD',
      timeout: 5000
    };
    
    const req = https.request(options, (res) => {
      console.log('Network connection successful!');
      console.log('Status code:', res.statusCode);
      console.log('Headers:', res.headers);
    });
    
    req.on('error', (e) => {
      console.error('Network connection failed:', e);
    });
    
    req.on('timeout', () => {
      console.error('Network connection timed out');
      req.destroy();
    });
    
    req.end();
    
  } catch (error) {
    console.error('Error testing Twilio connection:', error);
    
    // Handle specific error types
    if (error.code === 'ENOTFOUND') {
      console.error('Network error: Could not connect to Twilio API. Please check your internet connection.');
    } else if (error.code === 'ETIMEDOUT') {
      console.error('Connection timed out while trying to reach Twilio API.');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('Connection refused by Twilio API. Please check your network settings.');
    } else if (error.code === 'EAUTH') {
      console.error('Authentication failed. Please check your Twilio credentials.');
    }
  }
}

testTwilioConnection(); 