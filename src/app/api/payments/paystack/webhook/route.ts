import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { generateLicenseKey } from '@/lib/utils/helpers';
import crypto from 'crypto';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-paystack-signature');

    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 401 });
    }

    // Verify signature
    const hash = crypto
      .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!)
      .update(body)
      .digest('hex');

    if (hash !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event = JSON.parse(body);

    if (event.event === 'charge.success') {
      const reference = event.data.reference;

      // 1. Find the pending order
      const { data: order, error: orderFetchError } = await supabaseAdmin
        .from('orders')
        .select('*')
        .eq('transaction_id', reference)
        .eq('payment_status', 'pending')
        .single();

      if (!order || orderFetchError) {
        // Order might have been processed by the verify route already
        return NextResponse.json({ success: true, message: 'Order already processed or not found' });
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

      console.log(`Paystack webhook: Payment successful for Order ${order.id}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Paystack Webhook error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
