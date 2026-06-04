import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { licenseKey, productSlug, machineId } = await request.json();

    if (!licenseKey || !productSlug || !machineId) {
      return NextResponse.json({ 
        valid: false, 
        message: 'Missing required parameters: licenseKey, productSlug, and machineId are required.' 
      }, { status: 400 });
    }

    // 1. Fetch license and related product
    const { data: license, error: licenseError } = await supabaseAdmin
      .from('licenses')
      .select('*, products!inner(*)')
      .eq('license_key', licenseKey)
      .eq('products.slug', productSlug)
      .single();

    if (licenseError || !license) {
      return NextResponse.json({ 
        valid: false, 
        message: 'Invalid license key or product mismatch.' 
      }, { status: 404 });
    }

    if (license.status !== 'active') {
      return NextResponse.json({ 
        valid: false, 
        message: `License is ${license.status}.` 
      }, { status: 403 });
    }

    if (license.expires_at && new Date(license.expires_at) < new Date()) {
      return NextResponse.json({ 
        valid: false, 
        message: 'License has expired.' 
      }, { status: 403 });
    }

    // 2. Check if this machine is already activated
    const { data: activation } = await supabaseAdmin
      .from('license_activations')
      .select('*')
      .eq('license_id', license.id)
      .eq('machine_id', machineId)
      .single();

    if (activation) {
      return NextResponse.json({ 
        valid: true, 
        message: 'License validated successfully (existing activation).' 
      });
    }

    // 3. New activation - check limits
    const { count } = await supabaseAdmin
      .from('license_activations')
      .select('*', { count: 'exact', head: true })
      .eq('license_id', license.id);

    if ((count || 0) >= license.max_activations) {
      return NextResponse.json({ 
        valid: false, 
        message: 'Maximum activation limit reached for this license.' 
      }, { status: 403 });
    }

    // 4. Perform activation
    const { error: activateError } = await supabaseAdmin
      .from('license_activations')
      .insert({
        license_id: license.id,
        machine_id: machineId,
        ip_address: request.headers.get('x-forwarded-for') || 'unknown'
      });

    if (activateError) {
      throw activateError;
    }

    // Update activation count in licenses table (optional but good for quick checks)
    await supabaseAdmin
      .from('licenses')
      .update({ activation_count: (count || 0) + 1 })
      .eq('id', license.id);

    return NextResponse.json({ 
      valid: true, 
      message: 'License activated and validated successfully.' 
    });

  } catch (error: any) {
    console.error('License validation error:', error);
    return NextResponse.json({ 
      valid: false, 
      message: 'Internal server error during validation.' 
    }, { status: 500 });
  }
}
