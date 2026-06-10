import { createClient } from '@supabase/supabase-js';
import { verifyTransaction } from '@/lib/paystack';
import { NextResponse } from 'next/server';
import { generateLicenseKey } from '@/lib/utils/helpers';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get('reference');

  if (!reference) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard?error=Missing reference`);
  }

  try {
    const verificationData = await verifyTransaction(reference);

    if (verificationData.status && verificationData.data.status === 'success') {
      // 1. Find the pending order
      const { data: order, error: orderFetchError } = await supabaseAdmin
        .from('orders')
        .select('*')
        .eq('transaction_id', reference)
        .eq('payment_status', 'pending')
        .single();

      if (orderFetchError || !order) {
        console.error('Order not found or already processed:', reference);
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard?error=Order not found`);
      }

      // 2. Update Order status
      await supabaseAdmin
        .from('orders')
        .update({
          payment_status: 'completed',
        })
        .eq('id', order.id);

      // 3. Generate License
      const licenseKey = generateLicenseKey();
      await supabaseAdmin
        .from('licenses')
        .insert({
          user_id: order.user_id,
          product_id: order.product_id,
          license_key: licenseKey,
          status: 'active',
          max_activations: 1,
        });

      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`);
    } else {
      await supabaseAdmin
        .from('orders')
        .update({ payment_status: 'failed' })
        .eq('transaction_id', reference);
        
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard?error=Payment failed`);
    }
  } catch (error) {
    console.error('Paystack Verification error:', error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard?error=Verification failed`);
  }
}
