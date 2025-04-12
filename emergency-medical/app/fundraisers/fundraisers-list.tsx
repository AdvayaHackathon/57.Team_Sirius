"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LocationSelector } from "@/components/ui-custom/location-selector"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Heart, Mail, Phone, Search } from "lucide-react"

interface FundraisersListProps {
  fundraisers: any[]
}

export function FundraisersList({ fundraisers }: FundraisersListProps) {
  const [filteredFundraisers, setFilteredFundraisers] = useState(fundraisers)
  const [searchTerm, setSearchTerm] = useState("")
  const [stateId, setStateId] = useState<number | null>(null)
  const [districtId, setDistrictId] = useState<number | null>(null)

  const handleSearch = () => {
    let results = [...fundraisers]

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      results = results.filter(
        (f) =>
          f.patient_name.toLowerCase().includes(term) ||
          f.illness_description.toLowerCase().includes(term) ||
          f.hospital_name.toLowerCase().includes(term),
      )
    }

    if (stateId) {
      results = results.filter((f) => f.state_id === stateId)

      if (districtId) {
        results = results.filter((f) => f.district_id === districtId)
      }
    }

    setFilteredFundraisers(results)
  }

  const handleResetFilters = () => {
    setSearchTerm("")
    setStateId(null)
    setDistrictId(null)
    setFilteredFundraisers(fundraisers)
  }

  const handleRequestContact = (fundraiserId: string, contactEmail: string) => {
    // In a real implementation, we would send an email to the contact person
    // This is a placeholder for the actual implementation
    console.log(`Would send email to ${contactEmail} for fundraiser ${fundraiserId}`)

    alert(`Contact request sent. The patient's family will reach out to you soon.`)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <Label htmlFor="search" className="sr-only">
              Search
            </Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search by patient name, illness, or hospital"
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Button type="button" onClick={handleSearch}>
            Search
          </Button>

          <Button type="button" variant="outline" onClick={handleResetFilters}>
            Reset
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="state">Filter by Location</Label>
            <LocationSelector onStateChange={(id) => setStateId(id)} onDistrictChange={(id) => setDistrictId(id)} />
          </div>

          <div>
            <Label htmlFor="sortBy">Sort By</Label>
            <Select defaultValue="recent">
              <SelectTrigger id="sortBy">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="amount">Highest Amount</SelectItem>
                <SelectItem value="progress">Progress</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {filteredFundraisers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No fundraisers found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredFundraisers.map((fundraiser) => (
            <Card key={fundraiser.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src={fundraiser.image_url || "/placeholder.svg?height=200&width=400"}
                  alt={fundraiser.patient_name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg">{fundraiser.patient_name}</h3>
                    <span className="text-sm text-muted-foreground">{formatDate(fundraiser.created_at)}</span>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">{fundraiser.illness_description}</p>

                  <div className="text-sm">
                    <span className="font-medium">Hospital:</span> {fundraiser.hospital_name}
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Raised: {formatCurrency(fundraiser.raised_amount || 0)}</span>
                      <span>Goal: {formatCurrency(fundraiser.required_amount)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-pink-500 h-2.5 rounded-full"
                        style={{
                          width: `${Math.min(
                            100,
                            ((fundraiser.raised_amount || 0) / fundraiser.required_amount) * 100,
                          )}%`,
                        }}
                      ></div>
                    </div>
                    <div className="text-xs text-right text-muted-foreground">
                      {Math.round(((fundraiser.raised_amount || 0) / fundraiser.required_amount) * 100)}% of goal
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex gap-2">
                <Button
                  className="flex-1 gap-1"
                  onClick={() => handleRequestContact(fundraiser.id, fundraiser.contact_email)}
                >
                  <Mail className="h-4 w-4" />
                  <span>Contact</span>
                </Button>
                <Button variant="outline" className="flex-1 gap-1" asChild>
                  <a href={`tel:${fundraiser.contact_phone}`}>
                    <Phone className="h-4 w-4" />
                    <span>Call</span>
                  </a>
                </Button>
                <Button variant="ghost" size="icon" className="text-pink-500">
                  <Heart className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
