import { NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { createBloodDonorRegistrationEmail, sendEmail } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { 
      name, 
      email, 
      phone, 
      blood_group, 
      state_id, 
      district_id, 
      last_donation_date 
    } = body

    // Validate required fields
    if (!name || !email || !phone || !blood_group) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get Supabase client
    const supabase = getSupabaseServerClient()

    // Insert donor data into database
    const { data: donor, error: insertError } = await supabase
      .from('blood_donors')
      .insert([{
        full_name: name,
        email: email,
        phone: phone,
        blood_group: blood_group,
        state_id: state_id,
        district_id: district_id,
        last_donation_date: last_donation_date,
        is_available: true,
        check: false
      }])
      .select()
      .single()

    if (insertError) {
      console.error('Error inserting blood donor:', insertError)
      return NextResponse.json(
        { error: 'Failed to register blood donor' },
        { status: 500 }
      )
    }

    // Send confirmation email
    try {
      const emailHtml = createBloodDonorRegistrationEmail(name, blood_group)
      
      await sendEmail(
        email,
        'Blood Donor Registration Confirmation',
        emailHtml
      );
      
      console.log(`Confirmation email sent to: ${email}`)
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError)
      // Don't fail the request if email sending fails
    }

    return NextResponse.json({ 
      success: true, 
      donor
    })
  } catch (error) {
    console.error('Error in blood donor registration API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 