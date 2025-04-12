"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

export default function TestNotificationsPage() {
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; messageId?: string; error?: string } | null>(null)

  const handleTestSMS = async () => {
    if (!phone) {
      setResult({ success: false, error: "Please enter a phone number" })
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const message = `This is a test SMS from Emergency Medical. If you received this, your SMS notifications are working correctly!`
      
      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: phone,
          message: message,
          type: 'sms'
        })
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send SMS')
      }
      
      setResult({ success: true, messageId: data.messageId })
    } catch (error) {
      console.error('SMS test error:', error)
      setResult({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      })
    } finally {
      setLoading(false)
    }
  }

  const handleTestEmail = async () => {
    if (!email) {
      setResult({ success: false, error: "Please enter an email address" })
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">Test Email Notification</h2>
          <p>This is a test email from the Emergency Medical app.</p>
          <p>If you received this email, the email notification system is working correctly.</p>
        </div>
      `
      
      const response = await fetch('/api/notifications/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email,
          subject: 'Test Email from Emergency Medical',
          html: html
        })
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email')
      }
      
      setResult({ success: true, messageId: data.messageId })
    } catch (error) {
      console.error('Email test error:', error)
      setResult({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Test Notifications</h1>
      
      <div className="max-w-md space-y-6">
        <Alert className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Test Notifications</AlertTitle>
          <AlertDescription className="mt-2">
            <p>Use this page to test SMS and email notifications. Enter a phone number or email address below to send a test message.</p>
            <p className="mt-2 text-sm">Note: SMS messages may incur charges on your Twilio account.</p>
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder="+91 9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Button 
              onClick={handleTestSMS} 
              disabled={loading || !phone}
              className="w-full"
            >
              {loading ? "Sending..." : "Test SMS"}
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="test@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button 
              onClick={handleTestEmail} 
              disabled={loading || !email}
              className="w-full"
            >
              {loading ? "Sending..." : "Test Email"}
            </Button>
          </div>
        </div>
        
        {result && (
          <Alert variant={result.success ? "default" : "destructive"}>
            {result.success ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertTitle>
              {result.success ? "Success" : "Error"}
            </AlertTitle>
            <AlertDescription>
              {result.success 
                ? `Message sent successfully! Message ID: ${result.messageId}. Please check your device for the message.` 
                : result.error}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
} 