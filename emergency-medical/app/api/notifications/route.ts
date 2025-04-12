import { NextResponse } from 'next/server'
import { sendNotification } from '@/lib/notifications'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { to, message, type, subject, html } = body

    if (!to || !message || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const result = await sendNotification(type, to, message, subject, html)
    
    return NextResponse.json({ 
      success: true, 
      messageId: result.sid || result.messageId 
    })
  } catch (error: any) {
    console.error('Error sending notification:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to send notification' },
      { status: 500 }
    )
  }
}
