import { createClient } from '@/lib/supabase/server';
import { initializeTransaction } from '@/lib/paystack';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { productId, priceType } = await request.json();
    
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

    const priceUSD = priceType === 'lifetime' ? product.price_lifetime : product.price_monthly;
    
    // Metadata for the order
    const metadata = {
      user_id: user.id,
      product_id: product.id,
      price_type: priceType,
    };

    const paystackResponse = await initializeTransaction(user.email!, priceUSD, metadata);

    if (paystackResponse.status) {
      // Create a pending order
      await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          product_id: product.id,
          amount: priceUSD,
          currency: 'USD',
          payment_method: 'paystack',
          payment_status: 'pending',
          transaction_id: paystackResponse.data.reference,
        });

      return NextResponse.json({ 
        success: true, 
        authorization_url: paystackResponse.data.authorization_url,
        reference: paystackResponse.data.reference 
      });
    } else {
      return NextResponse.json({ 
        error: paystackResponse.message || 'Failed to initialize Paystack payment.' 
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Paystack Initialize error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
