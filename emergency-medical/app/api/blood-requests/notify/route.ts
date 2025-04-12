import { NextResponse } from 'next/server'
import { sendBloodRequestEmail } from '@/lib/nodemailer'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { donors, requestDetails } = body

    if (!donors || !Array.isArray(donors) || !requestDetails) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      )
    }

    console.log(`Sending notifications to ${donors.length} donors...`)

    // Send notifications to all matched donors
    const notificationPromises = donors.map(async (donor) => {
      try {
        if (donor.email) {
          console.log(`Sending email to donor ${donor.id} (${donor.email})...`)
          await sendBloodRequestEmail(
            donor.full_name,
            donor.email,
            {
              patientName: requestDetails.patientName,
              bloodGroup: requestDetails.bloodGroup,
              hospital: requestDetails.hospital,
              contactNumber: requestDetails.contactNumber
            }
          )
          console.log(`✓ Email sent successfully to donor: ${donor.email}`)
          return { success: true, donorId: donor.id }
        }
        return { success: false, donorId: donor.id, reason: 'No email address' }
      } catch (error: any) {
        console.error(`Failed to send email to donor ${donor.id}:`, error)
        return { success: false, donorId: donor.id, reason: error.message || 'Unknown error' }
      }
    })

    // Wait for all notifications to be sent
    console.log('Waiting for all notifications to complete...')
    const results = await Promise.allSettled(notificationPromises)
    const successful = results.filter(r => r.status === 'fulfilled' && r.value?.success).length
    const failed = results.filter(r => r.status === 'rejected' || !r.value?.success).length

    console.log(`Notification results: ${successful} successful, ${failed} failed`)

    return NextResponse.json({
      success: true,
      notificationsSent: successful,
      notificationsFailed: failed
    })
  } catch (error: any) {
    console.error('Error sending notifications:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to send notifications' },
      { status: 500 }
    )
  }
} 