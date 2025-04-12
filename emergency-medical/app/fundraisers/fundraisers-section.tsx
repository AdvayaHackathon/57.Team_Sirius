"use client"

import { useState } from "react"
import { ImageSlider } from "@/components/ui-custom/image-slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatsCard } from "@/components/ui-custom/stats-card"
import { FundraiserForm } from "./fundraiser-form"
import { FundraisersList } from "./fundraisers-list"
import { Heart, DollarSign, Users } from "lucide-react"

interface FundraisersSectionProps {
  fundraisers: any[]
  totalFundraisers: number
  totalRaised: string
  totalRequired: string
}

export function FundraisersSection({
  fundraisers,
  totalFundraisers,
  totalRaised,
  totalRequired,
}: FundraisersSectionProps) {
  const [activeTab, setActiveTab] = useState("view")

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Patient Fundraisers</h1>
        <p className="mt-2 text-muted-foreground">Help patients raise funds for medical treatments</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <StatsCard
          title="Active Fundraisers"
          value={totalFundraisers}
          description="Patients seeking help"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Total Raised"
          value={totalRaised}
          description="Funds raised so far"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Total Required"
          value={totalRequired}
          description="Total funds needed"
          icon={<Heart className="h-4 w-4 text-pink-500" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12">
        <div>
          <Tabs defaultValue="view" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="view">View Fundraisers</TabsTrigger>
              <TabsTrigger value="create">Create Fundraiser</TabsTrigger>
            </TabsList>
            <TabsContent value="view">
              <Card>
                <CardHeader>
                  <CardTitle>Active Fundraisers</CardTitle>
                  <CardDescription>Browse and support patients in need of financial assistance</CardDescription>
                </CardHeader>
                <CardContent>
                  <FundraisersList fundraisers={fundraisers} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="create">
              <Card>
                <CardHeader>
                  <CardTitle>Create a Fundraiser</CardTitle>
                  <CardDescription>Create a fundraiser for a patient in need of financial assistance</CardDescription>
                </CardHeader>
                <CardContent>
                  <FundraiserForm onSuccess={() => setActiveTab("view")} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <ImageSlider section="fundraisers" className="rounded-lg" />

          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
              <CardDescription>Learn how to create and support fundraisers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Creating a Fundraiser</h3>
                  <p className="text-sm text-muted-foreground">
                    Fill out the form with patient details, required amount, and contact information.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Supporting a Patient</h3>
                  <p className="text-sm text-muted-foreground">
                    Browse fundraisers, contact the patient's family, and provide financial support.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Verification Process</h3>
                  <p className="text-sm text-muted-foreground">
                    All fundraisers are verified to ensure authenticity and prevent fraud.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
