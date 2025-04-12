import { sendEmail } from '@/lib/email'

export async function sendBloodDonorEmail(to: string, fullName: string, bloodGroup: string) {
  try {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">Blood Donor Registration Confirmation</h2>
        <p>Dear ${fullName},</p>
        <p>Thank you for registering as a blood donor with blood group ${bloodGroup}.</p>
        <p>Your information has been saved in our database. When there's a need for blood in your area, we'll contact you.</p>
        <p>Please keep your contact information up to date.</p>
        <br>
        <p>Best regards,</p>
        <p>Emergency Medical Team</p>
      </div>
    `;

    const response = await sendEmail(to, 'Blood Donor Registration Confirmation', html);
    return { success: true, messageId: response.messageId };
  } catch (error: any) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message || 'Failed to send email' };
  }
} 