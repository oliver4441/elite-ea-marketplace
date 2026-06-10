import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { generateLicenseKey } from '@/lib/utils/helpers';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('M-Pesa Callback received:', JSON.stringify(body));

    const result = body.Body.stkCallback;
    const checkoutRequestId = result.CheckoutRequestID;
    const resultCode = result.ResultCode;

    if (resultCode === 0) {
      // Payment Successful
      const callbackMetadata = result.CallbackMetadata.Item;
      const receiptNumber = callbackMetadata.find((item: any) => item.Name === "MpesaReceiptNumber").Value;

      // 1. Find the pending order
      const { data: order, error: orderFetchError } = await supabaseAdmin
        .from('orders')
        .select('*')
        .eq('mpesa_checkout_id', checkoutRequestId)
        .eq('payment_status', 'pending')
        .single();

      if (orderFetchError || !order) {
        console.error('Order not found for M-Pesa checkout ID:', checkoutRequestId);
        return NextResponse.json({ success: false, message: 'Order not found' });
      }

      // 2. Update Order status
      const { error: orderUpdateError } = await supabaseAdmin
        .from('orders')
        .update({
          payment_status: 'completed',
          mpesa_receipt_number: receiptNumber,
          transaction_id: receiptNumber, // Use receipt number as transaction ID
        })
        .eq('id', order.id);

      if (orderUpdateError) {
        console.error('Error updating order:', orderUpdateError);
      }

      // 3. Generate License
      const licenseKey = generateLicenseKey();
      const { error: licenseError } = await supabaseAdmin
        .from('licenses')
        .insert({
          user_id: order.user_id,
          product_id: order.product_id,
          license_key: licenseKey,
          status: 'active',
          max_activations: 1,
        });

      if (licenseError) {
        console.error('Error creating license for order:', order.id, licenseError);
      }

      console.log(`M-Pesa payment successful for Order ${order.id}. Receipt: ${receiptNumber}`);
    } else {
      // Payment Failed or Cancelled
      const resultDesc = result.ResultDesc;
      console.warn(`M-Pesa payment failed for checkout ID ${checkoutRequestId}. Reason: ${resultDesc}`);
      
      await supabaseAdmin
        .from('orders')
        .update({ payment_status: 'failed' })
        .eq('mpesa_checkout_id', checkoutRequestId);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('M-Pesa Callback error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
