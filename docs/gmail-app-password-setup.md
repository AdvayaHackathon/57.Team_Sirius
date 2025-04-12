# Setting Up a Gmail App Password

To send emails from your application using Gmail, you need to set up an App Password if you have 2-factor authentication enabled on your Google account. Here's how to do it:

## Step 1: Enable 2-Step Verification (if not already enabled)

1. Go to your [Google Account](https://myaccount.google.com/)
2. Click on "Security" in the left navigation panel
3. Under "Signing in to Google," find "2-Step Verification" and click on it
4. Follow the prompts to enable 2-Step Verification

## Step 2: Create an App Password

1. Go to your [Google Account](https://myaccount.google.com/)
2. Click on "Security" in the left navigation panel
3. Under "Signing in to Google," find "App passwords" and click on it
   - Note: You'll only see this option if 2-Step Verification is enabled
4. At the bottom, click "Select app" and choose "Mail" (or "Other" and type a custom name)
5. Click "Select device" and choose the type of device you're using
6. Click "Generate"
7. Google will display a 16-character password. Copy this password.

## Step 3: Update Your Environment Variables

1. Open your `.env` file
2. Update the `EMAIL_APP_PASSWORD` variable with the 16-character password you generated:

```
EMAIL_APP_PASSWORD=your-16-character-app-password
```

3. Save the file and restart your application

## Troubleshooting

If you're still having issues sending emails:

1. Make sure your Gmail account doesn't have additional security restrictions
2. Check if your Gmail account has "Less secure app access" enabled (though this is less common now)
3. Verify that your application is using the correct SMTP settings:
   - Host: smtp.gmail.com
   - Port: 587
   - Secure: false
   - Authentication: Required

## Security Note

App Passwords are more secure than using your main account password because:
- They can be revoked individually without changing your main password
- They have limited access to your account
- They can't be used to access your Google account directly

Always keep your App Passwords secure and never share them publicly. 