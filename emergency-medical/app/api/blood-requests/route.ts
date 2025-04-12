import { NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { sendBloodRequestEmail } from '@/lib/nodemailer'

export async function POST(request: Request) {
  try {
    console.log('Received blood request');
    const body = await request.json()
    const { 
      patient_name, 
      blood_group, 
      units_required, 
      hospital, 
      city,
      contact_number,
      state_id,
      district_id,
      required_by
    } = body

    console.log('Blood request details:', {
      patient_name,
      blood_group,
      state_id,
      district_id
    });

    // Validate required fields
    if (!patient_name || !blood_group || !units_required || !hospital || !contact_number) {
      console.log('Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get Supabase client
    const supabase = getSupabaseServerClient()

    // Insert blood request into database
    console.log('Inserting blood request into database...');
    const { data: bloodRequest, error: insertError } = await supabase
      .from('blood_requests')
      .insert([{
        patient_name,
        blood_group,
        units_required,
        hospital,
        contact_number,
        state_id,
        district_id,
        required_by,
        status: 'pending',
        is_fulfilled: false
      }])
      .select()
      .single()

    if (insertError) {
      console.error('Error inserting blood request:', insertError)
      return NextResponse.json(
        { error: 'Failed to create blood request' },
        { status: 500 }
      )
    }
    console.log('Blood request inserted successfully');

    // Find compatible blood donors
    console.log('Finding compatible donors...');
    const { data: donors, error: donorsError } = await supabase
      .from('blood_donors')
      .select('*')
      .eq('blood_group', blood_group)
      .eq('is_active', true)
      .eq('state_id', state_id)
      .eq('district_id', district_id)
      .limit(50) // Limit to 50 donors to avoid overwhelming the system

    if (donorsError) {
      console.error('Error finding compatible donors:', donorsError)
      return NextResponse.json(
        { error: 'Failed to find compatible donors' },
        { status: 500 }
      )
    }

    console.log(`Found ${donors?.length || 0} compatible donors`);

    // Send notifications to compatible donors
    console.log('Sending notifications to compatible donors...');
    const notificationPromises = (donors || []).map(async (donor) => {
      try {
        if (donor.email) {
          console.log(`Sending email to donor ${donor.id} (${donor.email})...`);
          await sendBloodRequestEmail(
            donor.full_name,
            donor.email,
            {
              patientName: patient_name,
              bloodGroup: blood_group,
              hospital: hospital,
              city: city,
              contactNumber: contact_number
            }
          );
          console.log(`✓ Email sent successfully to donor: ${donor.email}`);
          return { success: true, donorId: donor.id };
        }
        return { success: false, donorId: donor.id, reason: 'No email address' };
      } catch (error: any) {
        console.error(`Failed to send email to donor ${donor.id}:`, error);
        return { success: false, donorId: donor.id, reason: error.message || 'Unknown error' };
      }
    });

    // Wait for all notifications to be sent
    console.log('Waiting for all notifications to complete...');
    const results = await Promise.allSettled(notificationPromises);
    const successful = results.filter(r => r.status === 'fulfilled' && r.value?.success).length;
    const failed = results.filter(r => r.status === 'rejected' || !r.value?.success).length;
    console.log(`Notification results: ${successful} successful, ${failed} failed`);

    // Update blood request status if compatible donors were found and notified
    if (donors && donors.length > 0) {
      console.log('Updating blood request status...');
      const { error: updateError } = await supabase
        .from('blood_requests')
        .update({ is_fulfilled: true })
        .eq('id', bloodRequest.id)

      if (updateError) {
        console.error('Error updating blood request status:', updateError)
      } else {
        console.log('Blood request status updated successfully');
      }
    }

    return NextResponse.json({ 
      success: true, 
      bloodRequest,
      notificationsSent: successful,
      notificationsFailed: failed,
      is_fulfilled: donors && donors.length > 0
    })
  } catch (error: any) {
    console.error('Error in blood request API:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
} 