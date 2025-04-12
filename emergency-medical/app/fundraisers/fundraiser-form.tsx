"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { LocationSelector } from "@/components/ui-custom/location-selector"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface FundraiserFormProps {
  onSuccess?: () => void
}

export function FundraiserForm({ onSuccess }: FundraiserFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    patientName: "",
    illnessDescription: "",
    hospitalName: "",
    requiredAmount: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    stateId: 0,
    districtId: 0,
    additionalDetails: "",
    imageUrl: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleStateChange = (stateId: number) => {
    setFormData((prev) => ({ ...prev, stateId, districtId: 0 }))
  }

  const handleDistrictChange = (districtId: number) => {
    setFormData((prev) => ({ ...prev, districtId }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const supabase = getSupabaseBrowserClient()

      // Get current user
      const {
        data: { session },
      } = await supabase.auth.getSession()

      // Insert fundraiser data
      const { error } = await supabase.from("patient_fundraisers").insert([
        {
          creator_id: session?.user?.id,
          patient_name: formData.patientName,
          illness_description: formData.illnessDescription,
          hospital_name: formData.hospitalName,
          required_amount: Number.parseFloat(formData.requiredAmount),
          contact_name: formData.contactName,
          contact_phone: formData.contactPhone,
          contact_email: formData.contactEmail,
          state_id: formData.stateId || null,
          district_id: formData.districtId || null,
          additional_details: formData.additionalDetails,
          image_url: formData.imageUrl || null,
        },
      ])

      if (error) throw error

      setSuccess(true)
      setFormData({
        patientName: "",
        illnessDescription: "",
        hospitalName: "",
        requiredAmount: "",
        contactName: "",
        contactPhone: "",
        contactEmail: "",
        stateId: 0,
        districtId: 0,
        additionalDetails: "",
        imageUrl: "",
      })

      // Refresh the page after a delay
      setTimeout(() => {
        router.refresh()
        if (onSuccess) onSuccess()
      }, 2000)
    } catch (error: any) {
      setError(error.message || "An error occurred while creating the fundraiser")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-50 text-green-800 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            Your fundraiser has been created successfully. It will be reviewed and published soon.
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="patientName">Patient Name</Label>
        <Input
          id="patientName"
          name="patientName"
          placeholder="Patient name"
          value={formData.patientName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="illnessDescription">Illness Description</Label>
        <Textarea
          id="illnessDescription"
          name="illnessDescription"
          placeholder="Describe the patient's medical condition"
          value={formData.illnessDescription}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="hospitalName">Hospital Name</Label>
        <Input
          id="hospitalName"
          name="hospitalName"
          placeholder="Hospital name"
          value={formData.hospitalName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="requiredAmount">Required Amount (₹)</Label>
        <Input
          id="requiredAmount"
          name="requiredAmount"
          type="number"
          placeholder="Required amount in INR"
          value={formData.requiredAmount}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contactName">Contact Person</Label>
          <Input
            id="contactName"
            name="contactName"
            placeholder="Contact person name"
            value={formData.contactName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactPhone">Contact Phone</Label>
          <Input
            id="contactPhone"
            name="contactPhone"
            placeholder="+91 9876543210"
            value={formData.contactPhone}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactEmail">Contact Email</Label>
        <Input
          id="contactEmail"
          name="contactEmail"
          type="email"
          placeholder="contact@example.com"
          value={formData.contactEmail}
          onChange={handleChange}
        />
      </div>

      <LocationSelector onStateChange={handleStateChange} onDistrictChange={handleDistrictChange} />

      <div className="space-y-2">
        <Label htmlFor="imageUrl">Image URL (Optional)</Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          placeholder="URL to patient's image"
          value={formData.imageUrl}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="additionalDetails">Additional Details</Label>
        <Textarea
          id="additionalDetails"
          name="additionalDetails"
          placeholder="Any additional information"
          value={formData.additionalDetails}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating..." : "Create Fundraiser"}
      </Button>
    </form>
  )
}
