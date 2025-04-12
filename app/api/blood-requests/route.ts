import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendEmail, createBloodRequestEmail } from '@/lib/email'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    const { 
      patientName, 
      bloodGroup, 
      hospital, 
      city, 
      contactNumber,
      stateId,
      districtId
    } = await request.json()

    // Validate required fields
    if (!patientName || !bloodGroup || !hospital || !city || !contactNumber) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Create blood request record
    const { data: requestData, error: requestError } = await supabase
      .from('blood_requests')
      .insert([
        {
          patient_name: patientName,
          blood_group: bloodGroup,
          hospital,
          city,
          contact_number: contactNumber,
          state_id: stateId,
          district_id: districtId,
          status: 'active'
        }
      ])
      .select()
      .single()

    if (requestError) throw requestError

    // Find compatible donors
    const { data: donors, error: donorsError } = await supabase
      .from('blood_donors')
      .select('*')
      .eq('blood_group', bloodGroup)
      .eq('is_available', true)
      .eq('city', city)

    if (donorsError) throw donorsError

    // Send emails to compatible donors
    const emailPromises = donors.map(donor => {
      const emailHtml = createBloodRequestEmail(donor.name, {
        patientName,
        bloodGroup,
        hospital,
        city,
        contactNumber
      })

      return sendEmail(
        donor.email,
        `Urgent Blood Donation Request - ${bloodGroup} Required`,
        emailHtml
      )
    })

    // Send emails in parallel
    await Promise.allSettled(emailPromises)

    return NextResponse.json({ 
      success: true, 
      requestId: requestData.id,
      donorsNotified: donors.length
    })
  } catch (error) {
    console.error('Blood request error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to process blood request' },
      { status: 500 }
    )
  }
} 