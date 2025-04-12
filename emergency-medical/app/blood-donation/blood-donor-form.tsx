"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseBrowserClient } from "../../lib/supabase/client"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { LocationSelector } from "../../components/ui-custom/location-selector"
import { bloodTypes } from "../../lib/form-options"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert"
import { toast } from 'sonner'

export function BloodDonorForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    blood_group: "",
    address: "",
    state_id: 0,
    district_id: 0,
    last_donation_date: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = getSupabaseBrowserClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user?.id) {
        setUserId(session.user.id)
      }
    }
    checkAuth()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleBloodGroupChange = (value: string) => {
    setFormData((prev) => ({ ...prev, blood_group: value }))
  }

  const handleStateChange = (stateId: number | null) => {
    setFormData((prev) => ({ ...prev, state_id: stateId || 0, district_id: 0 }))
  }

  const handleDistrictChange = (districtId: number | null) => {
    setFormData((prev) => ({ ...prev, district_id: districtId || 0 }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.phone || !formData.blood_group) {
        throw new Error('Please fill in all required fields')
      }

      // Format phone number
      const cleanPhone = formData.phone.replace(/\D/g, '')
      if (cleanPhone.length !== 10) {
        throw new Error('Phone number must be 10 digits')
      }
      const formattedPhone = `+91${cleanPhone}`

      // Prepare donor data
      const donorData = {
        name: formData.name,
        email: formData.email,
        phone: formattedPhone,
        blood_group: formData.blood_group,
        state_id: formData.state_id,
        district_id: formData.district_id,
        last_donation_date: formData.last_donation_date || null,
      }

      // Send data to API
      const response = await fetch('/api/blood-donors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donorData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to register donor')
      }

      toast.success('Registration successful!')
      router.push('/blood-donation/thank-you')
    } catch (error) {
      console.error('Error registering donor:', error)
      setError(error instanceof Error ? error.message : 'Failed to register donor')
      toast.error(error instanceof Error ? error.message : 'Failed to register donor')
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
            Thank you for registering as a blood donor! Your information has been saved.
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            name="phone"
            placeholder="9876543210"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="blood_group">Blood Group *</Label>
          <Select value={formData.blood_group} onValueChange={handleBloodGroupChange} required>
            <SelectTrigger id="blood_group">
              <SelectValue placeholder="Select blood group" />
            </SelectTrigger>
            <SelectContent>
              {bloodTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Textarea
          id="address"
          name="address"
          placeholder="Enter your address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>

      <LocationSelector onStateChange={handleStateChange} onDistrictChange={handleDistrictChange} />

      <div className="space-y-2">
        <Label htmlFor="last_donation_date">Last Donation Date (if any)</Label>
        <Input
          id="last_donation_date"
          name="last_donation_date"
          type="date"
          value={formData.last_donation_date}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={loading}>
        {loading ? "Registering..." : "Register as Donor"}
      </Button>
    </form>
  )
}
