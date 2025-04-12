"use client"

import React, { useState } from "react"
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
import { toast } from "react-hot-toast"
import { createBloodDonorRegistrationEmail, sendEmail } from "../../lib/email"

export function BloodDonorForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    bloodGroup: "",
    address: "",
    stateId: 0,
    districtId: 0,
    lastDonationDate: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleBloodGroupChange = (value: string) => {
    setFormData((prev) => ({ ...prev, bloodGroup: value }))
  }

  const handleStateChange = (stateId: number | null) => {
    setFormData((prev) => ({ ...prev, stateId: stateId || 0, districtId: 0 }))
  }

  const handleDistrictChange = (districtId: number | null) => {
    setFormData((prev) => ({ ...prev, districtId: districtId || 0 }))
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

      // Insert donor data
      const { error } = await supabase.from("blood_donors").insert([
        {
          user_id: session?.user?.id,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          blood_group: formData.bloodGroup,
          address: formData.address,
          state_id: formData.stateId || null,
          district_id: formData.districtId || null,
          last_donation_date: formData.lastDonationDate || null,
        },
      ])

      if (error) throw error

      setSuccess(true)
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        bloodGroup: "",
        address: "",
        stateId: 0,
        districtId: 0,
        lastDonationDate: "",
      })

      // Send notifications if enabled
      if (process.env.NEXT_PUBLIC_ENABLE_NOTIFICATIONS === 'true') {
        const notificationErrors: string[] = []

        // Send WhatsApp notification
        try {
          console.log('Attempting to send WhatsApp notification to:', formData.phone);
          
          // Format phone number to E.164 format
          let formattedPhone = formData.phone.replace(/\D/g, '') // Remove all non-digits
          console.log('After removing non-digits:', formattedPhone);
          
          // Remove leading zeros
          formattedPhone = formattedPhone.replace(/^0+/, '')
          console.log('After removing leading zeros:', formattedPhone);
          
          // Remove India country code if present
          if (formattedPhone.startsWith('91')) {
            formattedPhone = formattedPhone.substring(2)
            console.log('After removing country code:', formattedPhone);
          }
          
          // Add India country code
          formattedPhone = `+91${formattedPhone}`
          console.log('Final formatted phone number:', formattedPhone);
          
          const message = `Thank you ${formData.fullName} for registering as a blood donor (${formData.bloodGroup})! Your information has been saved.`
          
          console.log('Sending WhatsApp notification request:', { 
            to: formattedPhone, 
            message: message,
            type: 'whatsapp'
          });
          
          const whatsappResponse = await fetch('/api/notifications', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              to: formattedPhone,
              message: message,
              type: 'whatsapp'
            })
          })

          const responseData = await whatsappResponse.json();
          console.log('WhatsApp notification response:', responseData);

          if (!whatsappResponse.ok) {
            throw new Error(`WhatsApp notification failed: ${responseData.error || whatsappResponse.statusText}`)
          }
        } catch (error) {
          console.error('WhatsApp notification error:', error)
          if (error instanceof Error) {
            notificationErrors.push(error.message)
          } else {
            notificationErrors.push('Unknown WhatsApp notification error')
          }
        }

        // Send email notification
        if (formData.email) {
          try {
            console.log('Attempting to send email notification to:', formData.email);
            
            const emailHtml = createBloodDonorRegistrationEmail(formData.fullName, formData.bloodGroup)
            const emailResult = await sendEmail(
              formData.email,
              'Blood Donor Registration Confirmation',
              emailHtml
            )
            
            console.log('Email notification sent successfully:', emailResult);
          } catch (error) {
            console.error('Email notification error:', error)
            if (error instanceof Error) {
              notificationErrors.push(`Email notification failed: ${error.message}`)
            } else {
              notificationErrors.push('Unknown email notification error')
            }
          }
        }

        // Set error message if any notifications failed
        if (notificationErrors.length > 0) {
          setError(`Registration successful but some notifications failed: ${notificationErrors.join(', ')}`)
        }
      }

      // Refresh the page after a delay
      setTimeout(() => {
        router.refresh()
      }, 2000)
    } catch (error) {
      console.error('Registration error:', error)
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("An error occurred while registering as a donor")
      }
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

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john.doe@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            placeholder="+91 9876543210"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bloodGroup">Blood Group</Label>
          <Select value={formData.bloodGroup} onValueChange={handleBloodGroupChange} required>
            <SelectTrigger id="bloodGroup">
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
          required
        />
      </div>

      <LocationSelector onStateChange={handleStateChange} onDistrictChange={handleDistrictChange} />

      <div className="space-y-2">
        <Label htmlFor="lastDonationDate">Last Donation Date (if any)</Label>
        <Input
          id="lastDonationDate"
          name="lastDonationDate"
          type="date"
          value={formData.lastDonationDate}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={loading}>
        {loading ? "Registering..." : "Register as Donor"}
      </Button>
    </form>
  )
} 