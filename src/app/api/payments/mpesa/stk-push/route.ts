import { createClient } from '@/lib/supabase/server';
import { stkPush } from '@/lib/mpesa';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { productId, priceType, phoneNumber } = await request.json();
    
    // Validate phone number format (must be 2547XXXXXXXX or 2541XXXXXXXX)
    if (!phoneNumber || !/^254(7|1)\d{8}$/.test(phoneNumber)) {
      return NextResponse.json({ error: 'Invalid phone number. Use format 2547XXXXXXXX.' }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: product } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Convert USD price to KES (Assume a fixed rate or fetch one. For now, 1 USD = 130 KES)
    const priceUSD = priceType === 'lifetime' ? product.price_lifetime : product.price_monthly;
    const priceKES = priceUSD * 130; 

    const mpesaResponse = await stkPush(phoneNumber, priceKES, product.name.substring(0, 20));

    if (mpesaResponse.ResponseCode === "0") {
      // Create a pending order
      await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          product_id: product.id,
          amount: priceUSD,
          currency: 'USD',
          payment_method: 'mpesa',
          payment_status: 'pending',
          mpesa_checkout_id: mpesaResponse.CheckoutRequestID,
          phone_number: phoneNumber,
        });

      return NextResponse.json({ 
        success: true, 
        message: 'STK Push initiated successfully.',
        checkoutRequestId: mpesaResponse.CheckoutRequestID 
      });
    } else {
      return NextResponse.json({ 
        error: mpesaResponse.ResponseDescription || 'Failed to initiate M-Pesa payment.' 
      }, { status: 400 });
    }
  } catch (error: any) {
    console.error('M-Pesa STK Push error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
