import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { generateLicenseKey } from '@/lib/utils/helpers';

// Use service role key to bypass RLS in webhooks
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    const { userId, productId, priceType } = session.metadata;

    // 1. Create Order
    const { error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        user_id: userId,
        product_id: productId,
        amount: session.amount_total / 100,
        currency: session.currency.toUpperCase(),
        payment_method: 'stripe',
        payment_status: 'completed',
        transaction_id: session.id,
      });

    if (orderError) {
      console.error('Error creating order:', orderError);
    }

    // 2. Generate License
    const licenseKey = generateLicenseKey();
    const { error: licenseError } = await supabaseAdmin
      .from('licenses')
      .insert({
        user_id: userId,
        product_id: productId,
        license_key: licenseKey,
        status: 'active',
        max_activations: 1, // Default
      });

    if (licenseError) {
      console.error('Error creating license:', licenseError);
    }
  }

  return NextResponse.json({ received: true });
}
