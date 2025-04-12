import { getSupabaseServerClient } from '@/lib/supabase/server'

// Blood group compatibility map
export const bloodGroupCompatibility: Record<string, string[]> = {
  'O+': ['O+', 'O-'],
  'O-': ['O-'],
  'A+': ['A+', 'A-', 'O+', 'O-'],
  'A-': ['A-', 'O-'],
  'B+': ['B+', 'B-', 'O+', 'O-'],
  'B-': ['B-', 'O-'],
  'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  'AB-': ['A-', 'B-', 'AB-', 'O-']
}

export interface BloodDonor {
  id: string
  name: string
  email: string
  phone: string
  blood_group: string
  state_id: number
  district_id: number
  city: string
  is_active: boolean
  last_donation_date: string | null
}

export interface BloodRequestEmailParams {
  patientName: string
  bloodGroup: string
  hospital: string
  city: string
  contactNumber: string
}

/**
 * Find compatible blood donors based on blood group and location
 * @param bloodGroup - The required blood group
 * @param stateId - The state ID
 * @param districtId - The district ID
 * @returns Array of compatible blood donors
 */
export async function findCompatibleBloodDonors(
  bloodGroup: string,
  stateId?: number,
  districtId?: number
): Promise<BloodDonor[]> {
  try {
    console.log(`Finding compatible donors for blood group: ${bloodGroup}`);
    console.log(`Location: State ID: ${stateId}, District ID: ${districtId}`);
    
    // Get compatible blood groups
    const compatibleGroups = bloodGroupCompatibility[bloodGroup] || [bloodGroup];
    console.log(`Compatible blood groups: ${compatibleGroups.join(', ')}`);
    
    // Get Supabase client
    const supabase = getSupabaseServerClient();
    
    // Build query
    let query = supabase
      .from('blood_donors')
      .select('*')
      .in('blood_group', compatibleGroups)
      .eq('is_active', true);
    
    // Add location filters if provided
    if (stateId) {
      query = query.eq('state_id', stateId);
    }
    
    if (districtId) {
      query = query.eq('district_id', districtId);
    }
    
    // Execute query
    const { data, error } = await query;
    
    if (error) {
      console.error('Error finding compatible donors:', error);
      throw error;
    }
    
    console.log(`Found ${data?.length || 0} compatible donors`);
    return data || [];
  } catch (error) {
    console.error('Error in findCompatibleBloodDonors:', error);
    throw error;
  }
}

/**
 * Create HTML for blood request email
 * @param donorName - The donor's name
 * @param requestDetails - Details about the blood request
 * @returns HTML string for the email
 */
export function createBloodRequestEmail(donorName: string, requestDetails: BloodRequestEmailParams): string {
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
  `
} 