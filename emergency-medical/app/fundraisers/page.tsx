import { FundraisersSection } from "./fundraisers-section"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { formatCurrency } from "@/lib/utils"

export default async function FundraisersPage() {
  const supabase = getSupabaseServerClient()

  // Get fundraiser stats
  const { data: fundraisers } = await supabase
    .from("patient_fundraisers")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })

  // Calculate total amount raised
  const totalRaised = fundraisers?.reduce((sum, fundraiser) => sum + (fundraiser.raised_amount || 0), 0) || 0

  // Calculate total amount required
  const totalRequired = fundraisers?.reduce((sum, fundraiser) => sum + (fundraiser.required_amount || 0), 0) || 0

  return (
    <div className="flex flex-col min-h-screen">
      <FundraisersSection
        fundraisers={fundraisers || []}
        totalFundraisers={fundraisers?.length || 0}
        totalRaised={formatCurrency(totalRaised)}
        totalRequired={formatCurrency(totalRequired)}
      />
    </div>
  )
}
