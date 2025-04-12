import { NextResponse } from 'next/server'
import { sendEmail, createBloodRequestEmail } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { 
      donorId,
      donorEmail,
      donorName,
      patientName,
      bloodGroup,
      hospital,
      city,
      contactNumber
    } = body

    // Validate required fields
    if (!donorId || !donorEmail || !donorName || !patientName || !bloodGroup || !hospital || !city || !contactNumber) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create email content
    const emailHtml = createBloodRequestEmail(donorName, {
      patientName,
      bloodGroup,
      hospital,
      city,
      contactNumber
    })

    // Send email to donor
    await sendEmail(
      donorEmail,
      'Urgent Blood Donation Request',
      emailHtml
    )

    return NextResponse.json({ 
      success: true,
      message: 'Blood request email sent successfully'
    })
  } catch (error) {
    console.error('Error sending blood request email:', error)
    return NextResponse.json(
      { error: 'Failed to send blood request email' },
      { status: 500 }
    )
  }
} 