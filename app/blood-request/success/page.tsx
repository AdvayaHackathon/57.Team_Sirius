'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '../../../components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card'
import { CheckCircle2 } from 'lucide-react'

export default function BloodRequestSuccessPage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          </div>
          <CardTitle className="text-center">Request Submitted Successfully!</CardTitle>
          <CardDescription className="text-center">
            Your blood donation request has been submitted. Compatible donors in your area will be notified.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-500">
              What happens next?
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Compatible donors will receive an email notification</li>
              <li>• They will contact you directly if they can help</li>
              <li>• You can track your request status in your dashboard</li>
            </ul>
          </div>
          
          <div className="flex justify-center space-x-4 pt-4">
            <Button asChild>
              <Link href="/dashboard">
                Go to Dashboard
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/blood-request">
                Submit Another Request
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 