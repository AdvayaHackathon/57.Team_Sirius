"use client"

import { useState, useEffect } from "react"
import { ImageSlider } from "@/components/ui-custom/image-slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LocationSelector } from "@/components/ui-custom/location-selector"
import { Ambulance, Building2, Phone, AlertTriangle, Search, X } from "lucide-react"

interface EmergencySectionProps {
  emergencyTips?: string[]
  hospitals: any[]
  ambulanceServices: any[]
}

export function EmergencySection({
  emergencyTips = [],
  hospitals = [],
  ambulanceServices = [],
}: EmergencySectionProps) {
  const [activeTab, setActiveTab] = useState("hospitals")
  const [filteredHospitals, setFilteredHospitals] = useState(hospitals)
  const [filteredAmbulances, setFilteredAmbulances] = useState(ambulanceServices)
  const [searchTerm, setSearchTerm] = useState("")
  const [stateId, setStateId] = useState<number | null>(null)
  const [districtId, setDistrictId] = useState<number | null>(null)
  const [currentTipIndex, setCurrentTipIndex] = useState(0)

  useEffect(() => {
    if (emergencyTips.length === 0) return

    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % emergencyTips.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [emergencyTips])

  useEffect(() => {
    const filterItems = (items: any[]) => {
      return items.filter((item) => {
        const matchesSearch = searchTerm === "" || 
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.address.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesLocation = 
          (!stateId || item.state_id === stateId) &&
          (!districtId || item.district_id === districtId)

        return matchesSearch && matchesLocation
      })
    }

    setFilteredHospitals(filterItems(hospitals))
    setFilteredAmbulances(filterItems(ambulanceServices))
  }, [searchTerm, stateId, districtId, hospitals, ambulanceServices])

  const handleStateChange = (newStateId: number | null) => {
    setStateId(newStateId)
    setDistrictId(null)
  }

  const handleDistrictChange = (newDistrictId: number | null) => {
    setDistrictId(newDistrictId)
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  const resetFilters = () => {
    setSearchTerm("")
    setStateId(null)
    setDistrictId(null)
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Emergency Services</h1>
        <p className="mt-2 text-muted-foreground">Find nearby hospitals, ambulance services, and emergency contacts</p>
      </div>

      {emergencyTips.length > 0 && (
        <Card className="mb-8 border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800">Emergency Tip</h3>
                <p className="text-sm text-red-700">{emergencyTips[currentTipIndex]}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12">
        <div>
          <div className="space-y-4 mb-6">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <Label htmlFor="search" className="sr-only">
                  Search
                </Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search by name or address"
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>
              </div>

              <Button type="button" onClick={resetFilters}>
                Reset
              </Button>
            </div>

            <LocationSelector onStateChange={handleStateChange} onDistrictChange={handleDistrictChange} />
          </div>

          <Tabs defaultValue="hospitals" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="hospitals">Hospitals</TabsTrigger>
              <TabsTrigger value="ambulances">Ambulance Services</TabsTrigger>
            </TabsList>
            <TabsContent value="hospitals">
              <Card>
                <CardHeader>
                  <CardTitle>Emergency Hospitals</CardTitle>
                  <CardDescription>Find hospitals with emergency services</CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredHospitals.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No hospitals found matching your criteria.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredHospitals.map((hospital) => (
                        <Card key={hospital.id} className="overflow-hidden">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <Building2 className="h-4 w-4 text-blue-500" />
                                  <h3 className="font-medium">{hospital.name}</h3>
                                </div>
                                <p className="text-sm text-muted-foreground">{hospital.address}</p>
                              </div>
                              <Button variant="outline" size="sm" className="flex items-center gap-1" asChild>
                                <a href={`tel:${hospital.phone}`}>
                                  <Phone className="h-4 w-4" />
                                  <span>Call</span>
                                </a>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="ambulances">
              <Card>
                <CardHeader>
                  <CardTitle>Ambulance Services</CardTitle>
                  <CardDescription>Find available ambulance services</CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredAmbulances.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No ambulance services found matching your criteria.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredAmbulances.map((ambulance) => (
                        <Card key={ambulance.id} className="overflow-hidden">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <Ambulance className="h-4 w-4 text-red-500" />
                                  <h3 className="font-medium">{ambulance.name}</h3>
                                </div>
                                {ambulance.address && (
                                  <p className="text-sm text-muted-foreground">{ambulance.address}</p>
                                )}
                                {ambulance.service_type && (
                                  <p className="text-xs text-muted-foreground">Service: {ambulance.service_type}</p>
                                )}
                              </div>
                              <Button variant="outline" size="sm" className="flex items-center gap-1" asChild>
                                <a href={`tel:${ambulance.phone}`}>
                                  <Phone className="h-4 w-4" />
                                  <span>Call</span>
                                </a>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <ImageSlider section="emergency" className="rounded-lg" />

          <Card>
            <CardHeader>
              <CardTitle>Emergency Contacts</CardTitle>
              <CardDescription>Important emergency numbers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Ambulance className="h-4 w-4 text-red-500" />
                    <span className="font-medium">Ambulance</span>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-1" asChild>
                    <a href="tel:108">
                      <Phone className="h-4 w-4" />
                      <span>108</span>
                    </a>
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">Medical Helpline</span>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-1" asChild>
                    <a href="tel:102">
                      <Phone className="h-4 w-4" />
                      <span>102</span>
                    </a>
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">Police</span>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-1" asChild>
                    <a href="tel:100">
                      <Phone className="h-4 w-4" />
                      <span>100</span>
                    </a>
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    <span className="font-medium">Fire</span>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-1" asChild>
                    <a href="tel:101">
                      <Phone className="h-4 w-4" />
                      <span>101</span>
                    </a>
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="font-medium">Emergency Helpline</span>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-1" asChild>
                    <a href="tel:112">
                      <Phone className="h-4 w-4" />
                      <span>112</span>
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
