import { DashboardSection } from "./dashboard-section"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { bloodGroups } from "@/lib/utils"

export default async function DashboardPage() {
  const supabase = getSupabaseServerClient()

  // Get user count
  const { count: userCount } = await supabase.from("profiles").select("*", { count: "exact", head: true })

  // Get donor count
  const { count: donorCount } = await supabase.from("blood_donors").select("*", { count: "exact", head: true })

  // Get blood request count
  const { count: requestCount } = await supabase.from("blood_requests").select("*", { count: "exact", head: true })

  // Get fundraiser count
  const { count: fundraiserCount } = await supabase
    .from("patient_fundraisers")
    .select("*", { count: "exact", head: true })

  // Get donors by blood group
  const { data: donorStats } = await supabase.from("blood_donors").select("blood_group")

  // Count donors by blood group
  const donorsByBloodGroup: Record<string, number> = {}
  bloodGroups.forEach((group) => {
    donorsByBloodGroup[group] = 0
  })

  donorStats?.forEach((donor) => {
    if (donor.blood_group) {
      donorsByBloodGroup[donor.blood_group] = (donorsByBloodGroup[donor.blood_group] || 0) + 1
    }
  })

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardSection
        userCount={userCount || 0}
        donorCount={donorCount || 0}
        requestCount={requestCount || 0}
        fundraiserCount={fundraiserCount || 0}
        donorsByBloodGroup={donorsByBloodGroup}
      />
    </div>
  )
}
