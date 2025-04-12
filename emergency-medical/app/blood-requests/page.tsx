"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useStates } from '@/hooks/use-states'
import { useDistricts } from '@/hooks/use-districts'
import { toast } from 'sonner'

interface BloodRequest {
  patient_name: string;
  blood_group: string;
  units_required: number;
  hospital: string;
  city: string;
  contact_number: string;
  state_id: string;
  district_id: string;
  required_by: string;
}

export default function BloodRequestPage() {
  const router = useRouter()
  const { states, loading: statesLoading } = useStates()
  const [selectedState, setSelectedState] = useState<string>('')
  const { districts, loading: districtsLoading } = useDistricts(selectedState)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState<BloodRequest>({
    patient_name: '',
    blood_group: '',
    units_required: 1,
    hospital: '',
    city: '',
    contact_number: '',
    state_id: '',
    district_id: '',
    required_by: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/blood-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit blood request')
      }

      toast.success(`Blood request submitted successfully! ${data.notificationsSent} compatible donors have been notified.`)
      setFormData({
        patient_name: '',
        blood_group: '',
        units_required: 1,
        hospital: '',
        city: '',
        contact_number: '',
        state_id: '',
        district_id: '',
        required_by: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      })
    } catch (error) {
      console.error('Error submitting blood request:', error)
      toast.error('Failed to submit blood request')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (name === 'state_id') {
      setSelectedState(value)
      setFormData((prev) => ({ ...prev, district_id: '' }))
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Request Blood</h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="patient_name">Patient Name</Label>
            <Input
              id="patient_name"
              name="patient_name"
              value={formData.patient_name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="blood_group">Blood Group</Label>
            <Select
              value={formData.blood_group}
              onValueChange={(value) => handleSelectChange('blood_group', value)}
            >
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
            <Label htmlFor="units_required">Units Required</Label>
            <Input
              id="units_required"
              name="units_required"
              type="number"
              min="1"
              value={formData.units_required}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hospital">Hospital</Label>
            <Input
              id="hospital"
              name="hospital"
              value={formData.hospital}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact_number">Contact Number</Label>
            <Input
              id="contact_number"
              name="contact_number"
              type="tel"
              value={formData.contact_number}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state_id">State</Label>
            <Select
              value={formData.state_id}
              onValueChange={(value) => handleSelectChange('state_id', value)}
              disabled={statesLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state.id} value={state.id}>
                    {state.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="district_id">District</Label>
            <Select
              value={formData.district_id}
              onValueChange={(value) => handleSelectChange('district_id', value)}
              disabled={districtsLoading || !selectedState}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select district" />
              </SelectTrigger>
              <SelectContent>
                {districts.map((district) => (
                  <SelectItem key={district.id} value={district.id}>
                    {district.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="required_by">Required By</Label>
            <Input
              id="required_by"
              name="required_by"
              type="date"
              value={formData.required_by}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Request'}
        </Button>
      </form>
    </div>
  )
} 