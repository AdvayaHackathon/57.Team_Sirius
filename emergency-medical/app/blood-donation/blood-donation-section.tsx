"use client"

import { useState } from "react"
import { ImageSlider } from "@/components/ui-custom/image-slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatsCard } from "@/components/ui-custom/stats-card"
import { BloodDonorForm } from "./blood-donor-form"
import { BloodRequestForm } from "./blood-request-form"
import { BloodDonorSearch } from "./blood-donor-search"
import { Droplet, Users, AlertCircle } from "lucide-react"

interface BloodDonationSectionProps {
  donorsByBloodGroup: Record<string, number>
  totalDonors: number
  totalRequests: number
}

export function BloodDonationSection({ donorsByBloodGroup, totalDonors, totalRequests }: BloodDonationSectionProps) {
  const [activeTab, setActiveTab] = useState("register")

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Blood Donation</h1>
        <p className="mt-2 text-muted-foreground">Register as a donor, request blood, or search for donors</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <StatsCard
          title="Total Donors"
          value={totalDonors}
          description="Registered blood donors"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Blood Requests"
          value={totalRequests}
          description="Total blood requests"
          icon={<AlertCircle className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Most Common"
          value={Object.entries(donorsByBloodGroup).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A"}
          description="Most common blood group"
          icon={<Droplet className="h-4 w-4 text-red-500" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12">
        <div>
          <Tabs defaultValue="register" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="register">Register as Donor</TabsTrigger>
              <TabsTrigger value="request">Request Blood</TabsTrigger>
              <TabsTrigger value="search">Search Donors</TabsTrigger>
            </TabsList>
            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Register as Blood Donor</CardTitle>
                  <CardDescription>Fill out the form to register as a blood donor and help save lives.</CardDescription>
                </CardHeader>
                <CardContent>
                  <BloodDonorForm />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="request">
              <Card>
                <CardHeader>
                  <CardTitle>Request Blood</CardTitle>
                  <CardDescription>Submit a blood request for a patient in need.</CardDescription>
                </CardHeader>
                <CardContent>
                  <BloodRequestForm />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="search">
              <Card>
                <CardHeader>
                  <CardTitle>Search Blood Donors</CardTitle>
                  <CardDescription>Find blood donors based on blood group and location.</CardDescription>
                </CardHeader>
                <CardContent>
                  <BloodDonorSearch />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <ImageSlider section="blood-donation" className="rounded-lg" />

          <Card>
            <CardHeader>
              <CardTitle>Blood Group Compatibility</CardTitle>
              <CardDescription>Find compatible blood groups for transfusions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(donorsByBloodGroup).map(([group, count]) => (
                  <div key={group} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-2">
                      <Droplet className={`h-5 w-5 ${count > 0 ? "text-red-500" : "text-gray-300"}`} />
                      <span className="font-medium">{group}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{count} donors</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
