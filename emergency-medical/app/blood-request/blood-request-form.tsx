'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

export default function BloodRequestForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)
      const data = {
        patientName: formData.get('patientName'),
        bloodGroup: formData.get('bloodGroup'),
        hospitalName: formData.get('hospitalName'),
        hospitalAddress: formData.get('hospitalAddress'),
        contactName: formData.get('contactName'),
        contactPhone: formData.get('contactPhone'),
        stateId: formData.get('stateId'),
        districtId: formData.get('districtId')
      }

      const response = await fetch('/api/blood-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit blood request')
      }

      toast.success('Blood request submitted successfully')
      router.push('/blood-request/success')
    } catch (error) {
      console.error('Error submitting blood request:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to submit blood request')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="patientName">Patient Name</Label>
        <Input
          id="patientName"
          name="patientName"
          required
          placeholder="Enter patient's full name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bloodGroup">Blood Group Required</Label>
        <Select name="bloodGroup" required>
          <SelectTrigger>
            <SelectValue placeholder="Select blood group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="A+">A+</SelectItem>
            <SelectItem value="A-">A-</SelectItem>
            <SelectItem value="B+">B+</SelectItem>
            <SelectItem value="B-">B-</SelectItem>
            <SelectItem value="AB+">AB+</SelectItem>
            <SelectItem value="AB-">AB-</SelectItem>
            <SelectItem value="O+">O+</SelectItem>
            <SelectItem value="O-">O-</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="hospitalName">Hospital Name</Label>
        <Input
          id="hospitalName"
          name="hospitalName"
          required
          placeholder="Enter hospital name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="hospitalAddress">Hospital Address</Label>
        <Textarea
          id="hospitalAddress"
          name="hospitalAddress"
          required
          placeholder="Enter complete hospital address"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactName">Contact Person Name</Label>
        <Input
          id="contactName"
          name="contactName"
          required
          placeholder="Enter contact person's name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactPhone">Contact Phone Number</Label>
        <Input
          id="contactPhone"
          name="contactPhone"
          type="tel"
          required
          placeholder="Enter contact phone number"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="stateId">State</Label>
        <Select name="stateId">
          <SelectTrigger>
            <SelectValue placeholder="Select state" />
          </SelectTrigger>
          <SelectContent>
            {/* Add state options dynamically */}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="districtId">District</Label>
        <Select name="districtId">
          <SelectTrigger>
            <SelectValue placeholder="Select district" />
          </SelectTrigger>
          <SelectContent>
            {/* Add district options dynamically */}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Submitting...' : 'Submit Blood Request'}
      </Button>
    </form>
  )
} 