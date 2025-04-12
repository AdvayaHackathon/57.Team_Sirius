import { BloodDonationSection } from "./blood-donation-section"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { bloodGroups } from "@/lib/utils"

interface BloodDonorStat {
  blood_group: string;
  count: number;
}

export default async function BloodDonationPage() {
  const supabase = await getSupabaseServerClient();

  // Get blood donor stats with error handling
  let donorStats: BloodDonorStat[] = [];
  let totalRequests = 0;
  
  try {
    // Get blood donor stats - using a more reliable approach
    const { data, error } = await supabase
      .from("blood_donors")
      .select("blood_group");
      
    if (error) {
      console.error("Error fetching blood donor stats:", error);
    } else {
      // Process the data to count donors by blood group
      const bloodGroupCounts: Record<string, number> = {};
      
      // Initialize counts for all blood groups
      bloodGroups.forEach(group => {
        bloodGroupCounts[group] = 0;
      });
      
      // Count donors by blood group
      data?.forEach(donor => {
        if (donor.blood_group) {
          bloodGroupCounts[donor.blood_group] = (bloodGroupCounts[donor.blood_group] || 0) + 1;
        }
      });
      
      // Convert to the expected format
      donorStats = Object.entries(bloodGroupCounts).map(([blood_group, count]) => ({
        blood_group,
        count
      }));
    }

    // Get total blood requests
    const { count, error: countError } = await supabase
      .from("blood_requests")
      .select("*", { count: "exact", head: true });
      
    if (countError) {
      console.error("Error fetching blood request count:", countError);
    } else {
      totalRequests = count || 0;
    }
  } catch (error) {
    console.error("Error in BloodDonationPage:", error);
  }

  // Count donors by blood group
  const donorsByBloodGroup: Record<string, number> = {};
  bloodGroups.forEach((group) => {
    donorsByBloodGroup[group] = 0;
  });

  donorStats.forEach((donor) => {
    if (donor.blood_group) {
      donorsByBloodGroup[donor.blood_group] = donor.count;
    }
  });

  return (
    <div className="flex flex-col min-h-screen">
      <BloodDonationSection
        donorsByBloodGroup={donorsByBloodGroup}
        totalDonors={donorStats.reduce((sum, donor) => sum + donor.count, 0)}
        totalRequests={totalRequests || 0}
      />
    </div>
  );
}
