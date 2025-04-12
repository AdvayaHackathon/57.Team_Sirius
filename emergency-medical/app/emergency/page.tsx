import { EmergencySection } from "./emergency-section"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export default async function EmergencyPage() {
  const supabase = getSupabaseServerClient()

  // Get emergency tips
  const { data: emergencyTips } = await supabase.from("emergency_tips").select("*").order("id")

  // Get hospitals
  const { data: hospitals } = await supabase.from("hospitals").select("*").eq("has_emergency", true).order("name")

  // Get ambulance services
  const { data: ambulanceServices } = await supabase
    .from("ambulance_services")
    .select("*")
    .eq("is_available", true)
    .order("name")

  return (
    <div className="flex flex-col min-h-screen">
      <EmergencySection
        emergencyTips={emergencyTips || []}
        hospitals={hospitals || []}
        ambulanceServices={ambulanceServices || []}
      />
    </div>
  )
}
