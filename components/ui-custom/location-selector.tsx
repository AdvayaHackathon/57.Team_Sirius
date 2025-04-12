import * as React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Label } from "../ui/label"

interface LocationSelectorProps {
  onStateChange: (stateId: number | null) => void
  onDistrictChange: (districtId: number | null) => void
}

export function LocationSelector({ onStateChange, onDistrictChange }: LocationSelectorProps) {
  const [states, setStates] = React.useState<Array<{ id: number; name: string }>>([])
  const [districts, setDistricts] = React.useState<Array<{ id: number; name: string }>>([])
  const [selectedState, setSelectedState] = React.useState<string>("")
  const [selectedDistrict, setSelectedDistrict] = React.useState<string>("")

  React.useEffect(() => {
    // In a real application, you would fetch states from an API
    setStates([
      { id: 1, name: "State 1" },
      { id: 2, name: "State 2" },
      { id: 3, name: "State 3" },
    ])
  }, [])

  React.useEffect(() => {
    if (selectedState) {
      // In a real application, you would fetch districts based on the selected state
      setDistricts([
        { id: 1, name: "District 1" },
        { id: 2, name: "District 2" },
        { id: 3, name: "District 3" },
      ])
    } else {
      setDistricts([])
    }
  }, [selectedState])

  const handleStateChange = (value: string) => {
    setSelectedState(value)
    setSelectedDistrict("")
    onStateChange(value ? parseInt(value) : null)
    onDistrictChange(null)
  }

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value)
    onDistrictChange(value ? parseInt(value) : null)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="state">State</Label>
        <Select value={selectedState} onValueChange={handleStateChange}>
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
          value={selectedDistrict}
          onValueChange={handleDistrictChange}
          disabled={!selectedState}
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