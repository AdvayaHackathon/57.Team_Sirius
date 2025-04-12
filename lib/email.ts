import nodemailer from 'nodemailer';

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
transporter.verify(function(error, success) {
  if (error) {
    console.error('Email configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

export async function sendEmail(to: string, subject: string, html: string) {
  try {
    console.log('Sending email to:', to);
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
}

export function createBloodDonorRegistrationEmail(donorName: string, bloodGroup: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #dc2626;">Blood Donor Registration Confirmation</h2>
      <p>Dear ${donorName},</p>
      <p>Thank you for registering as a blood donor! Your registration has been successfully completed.</p>
      
      <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 15px 0;">
        <p><strong>Your Details:</strong></p>
        <p><strong>Name:</strong> ${donorName}</p>
        <p><strong>Blood Group:</strong> ${bloodGroup}</p>
      </div>
      
      <p>We will contact you when there is a need for your blood group in your area.</p>
      <p>Your commitment to helping others is greatly appreciated!</p>
      
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 0.875rem;">
          This is an automated message. Please do not reply to this email.
        </p>
      </div>
    </div>
  `;
}

export function createBloodRequestEmail(donorName: string, requestDetails: {
  patientName: string;
  bloodGroup: string;
  hospital: string;
  city: string;
  contactNumber: string;
}) {
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