import nodemailer from 'nodemailer';

// Create a transporter with Gmail settings
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD?.replace(/\s/g, '') // Remove any spaces from the app password
  }
});

// Verify the connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.error('Email configuration error:', error);
    console.error('Email settings:', {
      user: process.env.EMAIL_USER,
      passLength: process.env.EMAIL_APP_PASSWORD?.length || 0
    });
  } else {
    console.log('Email server is ready to send messages');
  }
});

/**
 * Send an email using Nodemailer
 * @param to - The recipient's email address
 * @param subject - The email subject
 * @param html - The email content in HTML format
 * @returns Promise with the email details
 */
export async function sendEmail(to: string, subject: string, html: string) {
  try {
    console.log('Preparing to send email:', {
      to,
      subject,
      from: `"Emergency Medical" <${process.env.EMAIL_USER}>`
    });
    
    const mailOptions = {
      from: `"Emergency Medical" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    };

    console.log('Sending email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', {
      messageId: info.messageId,
      response: info.response
    });
    return info;
  } catch (error: any) {
    console.error('Error sending email:', {
      error: error.message,
      code: error.code,
      command: error.command
    });
    throw new Error(`Failed to send email: ${error.message || 'Unknown error'}`);
  }
}

/**
 * Create HTML for blood donor registration confirmation email
 * @param donorName - The donor's name
 * @param bloodGroup - The donor's blood group
 * @returns HTML string for the email
 */
export function createBloodDonorRegistrationEmail(donorName: string, bloodGroup: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #dc2626;">Blood Donor Registration Confirmation</h2>
      <p>Dear ${donorName},</p>
      <p>Thank you for registering as a blood donor with blood group ${bloodGroup}.</p>
      <p>Your information has been saved in our database. When there's a need for blood in your area, we'll contact you.</p>
      <p>Please keep your contact information up to date.</p>
      <br>
      <p>Best regards,</p>
      <p>Emergency Medical Team</p>
    </div>
  `;
}

/**
 * Create HTML for blood request email
 * @param donorName - The donor's name
 * @param requestDetails - Details about the blood request
 * @returns HTML string for the email
 */
export function createBloodRequestEmail(donorName: string, requestDetails: {
  patientName: string;
  bloodGroup: string;
  hospital: string;
  city: string;
  contactNumber: string;
}): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #dc2626;">Blood Donation Request</h2>
      <p>Dear ${donorName},</p>
      <p>There is an urgent need for blood donation that matches your profile:</p>
      
      <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 15px 0;">
        <p><strong>Patient Name:</strong> ${requestDetails.patientName}</p>
        <p><strong>Blood Group Required:</strong> ${requestDetails.bloodGroup}</p>
        <p><strong>Hospital:</strong> ${requestDetails.hospital}</p>
        <p><strong>Location:</strong> ${requestDetails.city}</p>
        <p><strong>Contact Number:</strong> ${requestDetails.contactNumber}</p>
      </div>
      
      <p>If you are available and willing to donate, please contact the number provided above.</p>
      <p>Your help can save a life!</p>
      
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 0.875rem;">
          This is an automated message. Please do not reply to this email.
        </p>
      </div>
    </div>
  `;
} 