"use client"

import { useState, useEffect } from "react"
import { locationStates, locationDistricts } from "@/lib/form-options"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LocationSelectorProps {
  onStateChange: (stateId: number | null) => void
  onDistrictChange: (districtId: number | null) => void
  defaultStateId?: number | null
  defaultDistrictId?: number | null
}

interface StateOption {
  id: number;
  name: string;
}

interface DistrictOption {
  id: number;
  name: string;
}

export function LocationSelector({
  onStateChange,
  onDistrictChange,
  defaultStateId,
  defaultDistrictId,
}: LocationSelectorProps) {
  const states = locationStates
  
  const [districts, setDistricts] = useState<DistrictOption[]>([])
  const [selectedState, setSelectedState] = useState<number | null>(null)
  const [selectedDistrict, setSelectedDistrict] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Initialize with default values
    setSelectedState(defaultStateId ?? null)
    setSelectedDistrict(defaultDistrictId ?? null)
    if (defaultStateId) {
      setDistricts(locationDistricts[defaultStateId] || [])
    }
  }, [defaultStateId, defaultDistrictId])

  const handleStateChange = (value: string) => {
    if (!value) {
      setSelectedState(null)
      setSelectedDistrict(null)
      onStateChange(null)
      onDistrictChange(null)
      setDistricts([])
      return
    }

    const stateId = Number(value)
    if (isNaN(stateId) || !states.some(s => s.id === stateId)) {
      setSelectedState(null)
      onStateChange(null)
      return
    }

    setSelectedState(stateId)
    setSelectedDistrict(null)
    onStateChange(stateId)
    onDistrictChange(null)
    
    // Load districts for selected state
    const stateDistricts = locationDistricts[stateId] || []
    setDistricts(stateDistricts)
  }

  const handleDistrictChange = (value: string) => {
    if (!value || !selectedState) {
      setSelectedDistrict(null)
      onDistrictChange(null)
      return
    }

    const districtId = Number(value)
    if (isNaN(districtId) || !districts.some(d => d.id === districtId)) {
      setSelectedDistrict(null)
      onDistrictChange(null)
      return
    }

    setSelectedDistrict(districtId)
    onDistrictChange(districtId)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="state">State</Label>
        <Select 
          value={selectedState?.toString() ?? ""} 
          onValueChange={handleStateChange} 
          disabled={loading}
        >
          <SelectTrigger id="state">
            <SelectValue placeholder="Select state" />
          </SelectTrigger>
          <SelectContent>
            {states.map((state) => (
              <SelectItem key={state.id} value={state.id.toString()}>
                {state.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="district">District</Label>
        <Select
          value={selectedDistrict?.toString() ?? ""}
          onValueChange={handleDistrictChange}
          disabled={!selectedState || districts.length === 0}
        >
          <SelectTrigger id="district">
            <SelectValue placeholder="Select district" />
          </SelectTrigger>
          <SelectContent>
            {districts.map((district) => (
              <SelectItem key={district.id} value={district.id.toString()}>
                {district.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
