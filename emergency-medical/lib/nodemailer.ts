import nodemailer from 'nodemailer';
import { createBloodRequestEmail } from './email';

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  }
});

/**
 * Send an email using nodemailer
 * @param to - Recipient email address
 * @param subject - Email subject
 * @param html - HTML content of the email
 */
export async function sendEmailWithNodemailer(to: string, subject: string, html: string) {
  try {
    console.log(`Sending email to ${to}...`);
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${to}. Message ID: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error);
    throw error;
  }
}

/**
 * Send a blood request email to a donor
 * @param donorName - Name of the donor
 * @param donorEmail - Email of the donor
 * @param requestDetails - Details of the blood request
 */
export async function sendBloodRequestEmail(
  donorName: string,
  donorEmail: string,
  requestDetails: {
    patientName: string;
    bloodGroup: string;
    hospital: string;
    city: string;
    contactNumber: string;
  }
) {
  try {
    const emailHtml = createBloodRequestEmail(donorName, requestDetails);
    
    return await sendEmailWithNodemailer(
      donorEmail,
      `Urgent Blood Request: ${requestDetails.bloodGroup} Blood Needed`,
      emailHtml
    );
  } catch (error) {
    console.error(`Error sending blood request email to ${donorEmail}:`, error);
    throw error;
  }
} 