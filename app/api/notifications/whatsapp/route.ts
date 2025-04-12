import { NextResponse } from 'next/server'
import { sendWhatsApp } from '@/lib/kaleyra'

export async function POST(request: Request) {
  try {
    const { to, message } = await request.json()

    if (!to || !message) {
      return NextResponse.json(
        { error: 'Phone number and message are required' },
        { status: 400 }
      )
    }

    // Validate phone number format
    const phoneRegex = /^\+91[0-9]{10}$/
    if (!phoneRegex.test(to)) {
      return NextResponse.json(
        { error: 'Invalid phone number format. Must be in E.164 format (+91XXXXXXXXXX)' },
        { status: 400 }
      )
    }

    const response = await sendWhatsApp(to, message)
    
    return NextResponse.json({ 
      success: true, 
      messageId: response.id
    })
  } catch (error) {
    console.error('WhatsApp notification error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to send WhatsApp notification' },
      { status: 500 }
    )
  }
} 