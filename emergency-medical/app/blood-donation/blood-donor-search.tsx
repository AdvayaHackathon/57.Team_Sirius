"use client"

import type React from "react"

import { useState } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LocationSelector } from "@/components/ui-custom/location-selector"
import { bloodGroups } from "@/lib/utils"
import { AlertCircle, Mail, Phone } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"

interface Donor {
  id: string
  full_name: string
  blood_group: string
  email: string
  phone: string
  address: string
  last_donation_date: string | null
}

export function BloodDonorSearch() {
  const [bloodGroup, setBloodGroup] = useState<string>('')
  const [stateId, setStateId] = useState<number | null>(null)
  const [districtId, setDistrictId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [donors, setDonors] = useState<Donor[]>([])
  const [searched, setSearched] = useState(false)

  const handleStateChange = (newStateId: number | null) => {
    setStateId(newStateId)
    setDistrictId(null) // Reset district when state changes
  }

  const handleDistrictChange = (newDistrictId: number | null) => {
    setDistrictId(newDistrictId)
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setDonors([])

    try {
      if (!bloodGroup || !stateId || !districtId) {
        throw new Error("Please select blood group and location")
      }

      const supabase = getSupabaseBrowserClient()

      const { data, error } = await supabase
        .from("blood_donors")
        .select("*")
        .eq("blood_group", bloodGroup)
        .eq("state_id", stateId)
        .eq("district_id", districtId)
        .eq("is_available", true)

      if (error) throw error

      setDonors(data as Donor[])
      setSearched(true)
    } catch (error: any) {
      setError(error.message || "An error occurred while searching for donors")
    } finally {
      setLoading(false)
    }
  }

  const handleRequestContact = async (donor: any) => {
    try {
      // Show loading state
      setLoading(true)

      // Get patient details from form or state
      const patientName = "Test Patient" // Replace with actual patient name from form
      const hospital = "Test Hospital" // Replace with actual hospital from form
      const city = "Test City" // Replace with actual city from form
      const contactNumber = "1234567890" // Replace with actual contact number from form

      // Send blood request email
      const response = await fetch('/api/blood-requests/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          donorId: donor.id,
          donorEmail: donor.email,
          donorName: donor.full_name,
          patientName,
          bloodGroup: donor.blood_group,
          hospital,
          city,
          contactNumber
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send blood request email')
      }

      // Show success message
      alert('Blood request email sent successfully!')
    } catch (error) {
      console.error('Error sending blood request:', error)
      alert('Failed to send blood request email. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSearch} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="bloodGroup">Blood Group</Label>
          <Select value={bloodGroup} onValueChange={setBloodGroup} required>
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

        <LocationSelector
          onStateChange={handleStateChange}
          onDistrictChange={handleDistrictChange}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Searching..." : "Search Donors"}
        </Button>
      </form>

      {searched && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">
            {donors.length > 0
              ? `Found ${donors.length} donor(s) matching your criteria`
              : "No donors found matching your criteria"}
          </h3>

          {donors.map((donor) => (
            <Card key={donor.id}>
              <CardContent className="p-4">
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{donor.full_name}</h4>
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {donor.blood_group}
                    </span>
                  </div>

                  <div className="text-sm text-muted-foreground">{donor.address}</div>

                  {donor.last_donation_date && (
                    <div className="text-xs text-muted-foreground">
                      Last donation: {new Date(donor.last_donation_date).toLocaleDateString()}
                    </div>
                  )}

                  <div className="flex gap-2 mt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-1"
                      onClick={() => handleRequestContact(donor)}
                    >
                      <Mail className="h-4 w-4" />
                      <span>Request Contact</span>
                    </Button>

                    <Button size="sm" variant="ghost" className="flex items-center gap-1" asChild>
                      <a href={`tel:${donor.phone}`}>
                        <Phone className="h-4 w-4" />
                        <span>Call</span>
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
