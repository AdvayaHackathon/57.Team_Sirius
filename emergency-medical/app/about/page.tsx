"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Ambulance, Building2, Phone, AlertTriangle, Clock, Heart, Users } from "lucide-react"
import { ImageSlider } from "@/components/ui-custom/image-slider"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="container space-y-8 px-4 py-8 md:px-6 md:py-12">
      <div className="relative w-full h-[300px] rounded-lg overflow-hidden mb-8">
        <Image
          src="/banners/Blood Management.jpg"
          alt="Blood Management Banner"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">About Emergency Medical Services</h1>
        <p className="text-muted-foreground">
          Connecting people with emergency medical services and blood donors to save lives
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-red-500" />
              <CardTitle>Our Vision</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We envision a world where no one loses their life due to delayed medical assistance or lack of blood availability. Our platform bridges the gap between those in need and those who can help.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-6 w-6 text-blue-500" />
              <CardTitle>Who We Are</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We are a dedicated team of healthcare professionals and technology experts working together to create a seamless emergency response system that connects patients, hospitals, and blood donors.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-blue-500" />
            <CardTitle>Our Services</CardTitle>
          </div>
          <CardDescription>Comprehensive emergency medical support system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <h3 className="font-medium">Emergency Response</h3>
              </div>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>24/7 Emergency helpline</li>
                <li>Quick ambulance dispatch</li>
                <li>Real-time hospital availability</li>
                <li>Emergency contact alerts</li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                <h3 className="font-medium">Blood Services</h3>
              </div>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Blood donor registration</li>
                <li>Emergency blood requests</li>
                <li>Blood type matching</li>
                <li>Donor notification system</li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-500" />
                <h3 className="font-medium">Hospital Network</h3>
              </div>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Hospital locator</li>
                <li>Bed availability status</li>
                <li>Specialty department info</li>
                <li>Direct hospital contact</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-green-500" />
              <CardTitle>How It Works</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">For Emergency Cases</h3>
                <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                  <li>Call emergency helpline or use our app</li>
                  <li>Share location and emergency details</li>
                  <li>Get connected to nearest resources</li>
                  <li>Receive real-time assistance</li>
                </ol>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">For Blood Donation</h3>
                <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                  <li>Register as a blood donor</li>
                  <li>Receive notifications for matching requests</li>
                  <li>Confirm availability to donate</li>
                  <li>Save lives through donation</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Phone className="h-6 w-6 text-red-500" />
              <CardTitle>Emergency Contacts</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">24/7 Helplines</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center justify-between">
                    <span>Ambulance Services</span>
                    <span className="font-medium">108</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Medical Emergency</span>
                    <span className="font-medium">102</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Police</span>
                    <span className="font-medium">100</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Fire Emergency</span>
                    <span className="font-medium">101</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-red-500" />
            <CardTitle>Blood Donation Impact</CardTitle>
          </div>
          <CardDescription>Making a difference through blood donation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-medium">Why Donate Blood?</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>One donation can save up to three lives</li>
                <li>Blood cannot be manufactured artificially</li>
                <li>Regular donation helps maintain blood supply</li>
                <li>Critical for emergency medical procedures</li>
                <li>Essential for cancer treatments</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Blood Type Compatibility</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>O Negative: Universal donor</li>
                <li>AB Positive: Universal recipient</li>
                <li>Compatible matches increase donation efficiency</li>
                <li>Regular donors of all blood types needed</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-lg overflow-hidden">
        <ImageSlider section="about" />
      </div>
    </div>
  )
} 