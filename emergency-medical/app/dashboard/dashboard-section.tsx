"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatsCard } from "@/components/ui-custom/stats-card"
import { Users, Droplet, Heart, AlertCircle } from "lucide-react"

interface DashboardSectionProps {
  userCount: number
  donorCount: number
  requestCount: number
  fundraiserCount: number
  donorsByBloodGroup: Record<string, number>
}

export function DashboardSection({
  userCount,
  donorCount,
  requestCount,
  fundraiserCount,
  donorsByBloodGroup,
}: DashboardSectionProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">Overview of platform statistics and activities</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard
          title="Total Users"
          value={userCount}
          description="Registered users"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Blood Donors"
          value={donorCount}
          description="Registered donors"
          icon={<Droplet className="h-4 w-4 text-red-500" />}
        />
        <StatsCard
          title="Blood Requests"
          value={requestCount}
          description="Total requests"
          icon={<AlertCircle className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Fundraisers"
          value={fundraiserCount}
          description="Active fundraisers"
          icon={<Heart className="h-4 w-4 text-pink-500" />}
        />
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="blood">Blood Donation</TabsTrigger>
          <TabsTrigger value="fundraisers">Fundraisers</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-1 md:col-span-2 lg:col-span-2">
              <CardHeader>
                <CardTitle>Platform Overview</CardTitle>
                <CardDescription>Summary of platform activities and statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">User Registration</p>
                      <p className="text-2xl font-bold">{userCount}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Donor Registration</p>
                      <p className="text-2xl font-bold">{donorCount}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Blood Requests</p>
                      <p className="text-2xl font-bold">{requestCount}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Fundraisers</p>
                      <p className="text-2xl font-bold">{fundraiserCount}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium mb-2">Platform Metrics</p>
                    <ul className="space-y-1 text-sm">
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Donor to User Ratio</span>
                        <span className="font-medium">
                          {userCount > 0 ? Math.round((donorCount / userCount) * 100) : 0}%
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Request to Donor Ratio</span>
                        <span className="font-medium">
                          {donorCount > 0 ? Math.round((requestCount / donorCount) * 100) : 0}%
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Fundraisers per 100 Users</span>
                        <span className="font-medium">
                          {userCount > 0 ? Math.round((fundraiserCount / userCount) * 100) : 0}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Blood Group Distribution</CardTitle>
                <CardDescription>Distribution of donors by blood group</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(donorsByBloodGroup).map(([group, count]) => (
                    <div key={group} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{group}</span>
                        <span>{count} donors</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{
                            width: `${donorCount > 0 ? (count / donorCount) * 100 : 0}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="blood">
          <Card>
            <CardHeader>
              <CardTitle>Blood Donation Statistics</CardTitle>
              <CardDescription>Detailed statistics about blood donation activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium mb-4">Donors by Blood Group</h3>
                  <div className="space-y-4">
                    {Object.entries(donorsByBloodGroup).map(([group, count]) => (
                      <div key={group} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{group}</span>
                          <span>{count} donors</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-red-500 h-2 rounded-full"
                            style={{
                              width: `${donorCount > 0 ? (count / donorCount) * 100 : 0}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Blood Donation Metrics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Donors</p>
                        <p className="text-2xl font-bold">{donorCount}</p>
                      </div>
                      <Droplet className="h-8 w-8 text-red-500" />
                    </div>

                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Requests</p>
                        <p className="text-2xl font-bold">{requestCount}</p>
                      </div>
                      <AlertCircle className="h-8 w-8 text-amber-500" />
                    </div>

                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">Most Common</p>
                        <p className="text-2xl font-bold">
                          {Object.entries(donorsByBloodGroup).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A"}
                        </p>
                      </div>
                      <Droplet className="h-8 w-8 text-red-500" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="fundraisers">
          <Card>
            <CardHeader>
              <CardTitle>Fundraiser Statistics</CardTitle>
              <CardDescription>Detailed statistics about patient fundraisers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium mb-4">Fundraiser Metrics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">Active Fundraisers</p>
                        <p className="text-2xl font-bold">{fundraiserCount}</p>
                      </div>
                      <Heart className="h-8 w-8 text-pink-500" />
                    </div>

                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">Success Rate</p>
                        <p className="text-2xl font-bold">68%</p>
                      </div>
                      <Heart className="h-8 w-8 text-green-500" />
                    </div>

                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">Avg. Completion Time</p>
                        <p className="text-2xl font-bold">21 days</p>
                      </div>
                      <Heart className="h-8 w-8 text-blue-500" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Fundraiser Categories</h3>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Cancer Treatment</span>
                        <span>32%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-pink-500 h-2 rounded-full" style={{ width: "32%" }}></div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Organ Transplant</span>
                        <span>24%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-pink-500 h-2 rounded-full" style={{ width: "24%" }}></div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Accident Recovery</span>
                        <span>18%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-pink-500 h-2 rounded-full" style={{ width: "18%" }}></div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Rare Diseases</span>
                        <span>15%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-pink-500 h-2 rounded-full" style={{ width: "15%" }}></div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Others</span>
                        <span>11%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-pink-500 h-2 rounded-full" style={{ width: "11%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
