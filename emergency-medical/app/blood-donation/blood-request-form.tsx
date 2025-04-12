"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LocationSelector } from "@/components/ui-custom/location-selector"
import { bloodGroups, getCompatibleBloodGroups } from "@/lib/utils"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function BloodRequestForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [matchedDonors, setMatchedDonors] = useState<any[]>([])
  const [sendingEmails, setSendingEmails] = useState(false)

  const [formData, setFormData] = useState({
    patientName: "",
    bloodGroup: "",
    units: 1,
    hospitalName: "",
    hospitalAddress: "",
    stateId: null as number | null,
    districtId: null as number | null,
    contactPhone: "",
    urgencyLevel: "normal",
    additionalNotes: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleBloodGroupChange = (value: string) => {
    setFormData((prev) => ({ ...prev, bloodGroup: value }))
  }

  const handleUrgencyChange = (value: string) => {
    setFormData((prev) => ({ ...prev, urgencyLevel: value }))
  }

  const handleStateChange = (newStateId: number | null) => {
    setFormData((prev) => ({ ...prev, stateId: newStateId, districtId: null }))
  }

  const handleDistrictChange = (newDistrictId: number | null) => {
    setFormData((prev) => ({ ...prev, districtId: newDistrictId }))
  }

  const handleUnitsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value > 0) {
      setFormData((prev) => ({ ...prev, units: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const supabase = getSupabaseBrowserClient()

      // Find compatible donors in the same location
      if (formData.stateId && formData.districtId && formData.bloodGroup) {
        // Get compatible blood groups
        const compatibleGroups = getCompatibleBloodGroups(formData.bloodGroup)
        console.log('Compatible blood groups:', compatibleGroups)

        const { data: donors, error: donorsError } = await supabase
          .from("blood_donors")
          .select("*")
          .eq("district_id", formData.districtId)
          .in("blood_group", compatibleGroups)
          .eq("is_available", true)

        if (donorsError) throw donorsError

        setMatchedDonors(donors || [])
        setSuccess(`Found ${donors?.length || 0} compatible donors in your district. Click 'Send Notifications' to notify them.`)
      }

      // Insert blood request
      const { error: requestError } = await supabase.from("blood_requests").insert([
        {
          patient_name: formData.patientName,
          blood_group: formData.bloodGroup,
          units_required: formData.units,
          hospital_name: formData.hospitalName,
          hospital_address: formData.hospitalAddress,
          state_id: formData.stateId,
          district_id: formData.districtId,
          contact_phone: formData.contactPhone,
          urgency_level: formData.urgencyLevel,
          additional_notes: formData.additionalNotes,
          status: 'pending',
          is_fulfilled: false
        },
      ])

      if (requestError) throw requestError

    } catch (error: any) {
      setError(error.message || "An error occurred while submitting the blood request")
    } finally {
      setLoading(false)
    }
  }

  const handleSendNotifications = async () => {
    setSendingEmails(true)
    try {
      const response = await fetch('/api/blood-requests/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          donors: matchedDonors,
          requestDetails: {
            patientName: formData.patientName,
            bloodGroup: formData.bloodGroup,
            hospital: formData.hospitalName,
            contactNumber: formData.contactPhone
          }
        })
      })

      const result = await response.json()
      if (!response.ok) throw new Error(result.error)

      setSuccess(`Successfully sent notifications to ${result.notificationsSent} donors!`)
      setMatchedDonors([]) // Clear the matched donors after sending notifications
    } catch (error: any) {
      setError(error.message || "Failed to send notifications")
    } finally {
      setSendingEmails(false)
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
            {success}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-2">
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
          <Label htmlFor="bloodGroup">Required Blood Group</Label>
          <Select value={formData.bloodGroup} onValueChange={handleBloodGroupChange} required>
            <SelectTrigger id="bloodGroup">
              <SelectValue placeholder="Select blood group" />
            </SelectTrigger>
            <SelectContent>
              {bloodGroups.map((group) => (
                <SelectItem key={group} value={group}>
                  {group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="units">Units Required</Label>
          <Input
            id="units"
            name="units"
            type="number"
            min="1"
            value={formData.units}
            onChange={handleUnitsChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="urgencyLevel">Urgency Level</Label>
          <Select value={formData.urgencyLevel} onValueChange={handleUrgencyChange} required>
            <SelectTrigger id="urgencyLevel">
              <SelectValue placeholder="Select urgency level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
        <Label htmlFor="hospitalAddress">Hospital Address</Label>
        <Textarea
          id="hospitalAddress"
          name="hospitalAddress"
          placeholder="Hospital address"
          value={formData.hospitalAddress}
          onChange={handleChange}
          required
        />
      </div>

      <LocationSelector onStateChange={handleStateChange} onDistrictChange={handleDistrictChange} />

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

      <div className="space-y-2">
        <Label htmlFor="additionalNotes">Additional Notes</Label>
        <Textarea
          id="additionalNotes"
          name="additionalNotes"
          placeholder="Any additional information"
          value={formData.additionalNotes}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Blood Request"}
        </Button>

        {matchedDonors.length > 0 && (
          <Button 
            type="button" 
            onClick={handleSendNotifications}
            disabled={sendingEmails}
            className="bg-green-600 hover:bg-green-700"
          >
            {sendingEmails 
              ? "Sending Notifications..." 
              : `Send Notifications to ${matchedDonors.length} Donors`
            }
          </Button>
        )}
      </div>
    </form>
  )
}
