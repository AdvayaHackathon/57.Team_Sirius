import { getSupabaseServerClient } from '@/lib/supabase/server';
import { BloodDonor } from '@/lib/blood-donors';

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
};

// Blood group priority (higher number = higher priority)
export const bloodGroupPriority: Record<string, number> = {
  'O+': 1,
  'O-': 2,
  'A+': 3,
  'A-': 4,
  'B+': 5,
  'B-': 6,
  'AB+': 7,
  'AB-': 8
};

/**
 * Find compatible blood donors based on blood group and location
 * @param bloodGroup - The required blood group
 * @param stateId - The state ID (optional)
 * @param districtId - The district ID (optional)
 * @param maxDistance - Maximum distance in kilometers (optional)
 * @param limit - Maximum number of donors to return (optional)
 * @returns Array of compatible donors sorted by priority
 */
export async function findCompatibleDonors(
  bloodGroup: string,
  stateId?: string,
  districtId?: string,
  maxDistance?: number,
  limit?: number
): Promise<BloodDonor[]> {
  const supabase = getSupabaseServerClient();
  
  // Get compatible blood groups
  const compatibleBloodGroups = bloodGroupCompatibility[bloodGroup] || [bloodGroup];
  console.log(`Compatible blood groups for ${bloodGroup}: ${compatibleBloodGroups.join(', ')}`);
  
  // Build the query
  let query = supabase
    .from('blood_donors')
    .select('*')
    .in('blood_group', compatibleBloodGroups)
    .eq('is_available', true)
    .eq('check', false);
  
  // Add location filters if provided
  if (stateId) {
    query = query.eq('state_id', stateId);
  }
  
  if (districtId) {
    query = query.eq('district_id', districtId);
  }
  
  // Add limit if provided
  if (limit) {
    query = query.limit(limit);
  }
  
  // Execute the query
  const { data: donors, error } = await query;
  
  if (error) {
    console.error('Error finding compatible donors:', error);
    throw new Error(`Failed to find compatible donors: ${error.message}`);
  }
  
  if (!donors || donors.length === 0) {
    console.log('No compatible donors found');
    return [];
  }
  
  // Sort donors by priority (exact match first, then by blood group priority)
  const sortedDonors = donors.sort((a, b) => {
    // Exact match gets highest priority
    if (a.blood_group === bloodGroup && b.blood_group !== bloodGroup) return -1;
    if (a.blood_group !== bloodGroup && b.blood_group === bloodGroup) return 1;
    
    // If both are exact matches or both are compatible, sort by blood group priority
    return bloodGroupPriority[a.blood_group] - bloodGroupPriority[b.blood_group];
  });
  
  console.log(`Found ${sortedDonors.length} compatible donors, sorted by priority`);
  return sortedDonors;
}

/**
 * Mark donors as checked in the database
 * @param donorIds - Array of donor IDs to mark as checked
 */
export async function markDonorsAsChecked(donorIds: string[]): Promise<void> {
  if (donorIds.length === 0) return;
  
  const supabase = getSupabaseServerClient();
  const { error } = await supabase
    .from('blood_donors')
    .update({ check: true })
    .in('id', donorIds);
  
  if (error) {
    console.error('Error marking donors as checked:', error);
    throw new Error(`Failed to mark donors as checked: ${error.message}`);
  }
  
  console.log(`Marked ${donorIds.length} donors as checked`);
}

/**
 * Reset donor check status after notification
 * @param donorId - The donor ID to reset
 */
export async function resetDonorCheckStatus(donorId: string): Promise<void> {
  const supabase = getSupabaseServerClient();
  const { error } = await supabase
    .from('blood_donors')
    .update({ check: false })
    .eq('id', donorId);
  
  if (error) {
    console.error(`Error resetting check status for donor ${donorId}:`, error);
    throw new Error(`Failed to reset donor check status: ${error.message}`);
  }
  
  console.log(`Reset check status for donor ${donorId}`);
}

/**
 * Get donor contact information
 * @param donorId - The donor ID
 * @returns Donor contact information
 */
export async function getDonorContactInfo(donorId: string): Promise<{ email?: string, phone?: string }> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from('blood_donors')
    .select('email, phone')
    .eq('id', donorId)
    .single();
  
  if (error) {
    console.error(`Error getting donor contact info for ${donorId}:`, error);
    return {};
  }
  
  return {
    email: data?.email,
    phone: data?.phone
  };
} 