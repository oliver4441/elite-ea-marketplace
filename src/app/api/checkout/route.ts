import { createClient } from '@/lib/supabase/server';
import { stripe } from '@/lib/stripe';
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

    const price = priceType === 'lifetime' ? product.price_lifetime : product.price_monthly;
    const interval = priceType === 'monthly' ? 'month' : undefined;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.short_description,
            },
            unit_amount: Math.round(price * 100),
            recurring: interval ? { interval } : undefined,
          },
          quantity: 1,
        },
      ],
      mode: interval ? 'subscription' : 'payment',
      success_url: `${request.headers.get('origin')}/dashboard?success=true`,
      cancel_url: `${request.headers.get('origin')}/bots/${product.slug}?canceled=true`,
      customer_email: user.email,
      metadata: {
        userId: user.id,
        productId: product.id,
        priceType,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
