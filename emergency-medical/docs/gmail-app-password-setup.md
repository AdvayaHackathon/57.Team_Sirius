# Setting up Gmail App Password for Emergency Medical

This guide will help you set up an App Password for your Gmail account to enable email notifications in the Emergency Medical application.

## Step 1: Enable 2-Step Verification

1. Go to your Google Account settings (https://myaccount.google.com/)
2. Click on "Security" in the left navigation menu
3. Under "Signing in to Google," find "2-Step Verification"
4. Follow the prompts to enable 2-Step Verification if it's not already enabled

## Step 2: Create an App Password

1. Go to your Google Account settings (https://myaccount.google.com/)
2. Click on "Security" in the left navigation menu
3. Under "Signing in to Google," find "App passwords"
4. Click on "App passwords"
5. Select "Mail" as the app and "Other" as the device
6. Enter "Emergency Medical" as the name
7. Click "Generate"
8. Google will display a 16-character password. Copy this password.

## Step 3: Update Environment Variables

1. Open your `.env` file
2. Update the `EMAIL_APP_PASSWORD` variable with the 16-character password you copied:
   ```
   EMAIL_APP_PASSWORD=your-16-character-password
   ```
3. Save the file

## Step 4: Test the Configuration

1. Run the test script:
   ```bash
   node scripts/test-email.js
   ```
2. You should receive a test email if the configuration is correct

## Troubleshooting

If you encounter issues:

1. Make sure 2-Step Verification is enabled
2. Verify that you're using the correct App Password
3. Check that your Gmail account doesn't have additional security restrictions
4. Ensure your `.env` file has the correct values for both `EMAIL_USER` and `EMAIL_APP_PASSWORD`

## Security Note

- App Passwords are more secure than using your main account password
- They can be revoked individually without affecting your main account
- Each App Password is specific to the application and device you specified
- Never share your App Password with anyone 