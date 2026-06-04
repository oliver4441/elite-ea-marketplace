import { createClient } from './server';

export async function getDashboardStats() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // 1. Get active licenses count
  const { count: activeLicenses } = await supabase
    .from('licenses')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('status', 'active');

  // 2. Get total profit from trading_stats for products the user owns
  // First, get owned product IDs
  const { data: licenses } = await supabase
    .from('licenses')
    .select('product_id')
    .eq('user_id', user.id);

  const ownedProductIds = licenses?.map(l => l.product_id) || [];

  let totalProfit = 0;
  if (ownedProductIds.length > 0) {
    const { data: stats } = await supabase
      .from('trading_stats')
      .select('profit')
      .in('product_id', ownedProductIds);
    
    totalProfit = stats?.reduce((sum, s) => sum + Number(s.profit), 0) || 0;
  }

  // 3. Get average win rate of owned bots
  let avgWinRate = 0;
  if (ownedProductIds.length > 0) {
    const { data: products } = await supabase
      .from('products')
      .select('win_rate')
      .in('id', ownedProductIds);
    
    avgWinRate = products?.length 
      ? products.reduce((sum, p) => sum + Number(p.win_rate), 0) / products.length 
      : 0;
  }

  return {
    activeLicenses: activeLicenses || 0,
    totalProfit,
    avgWinRate: Math.round(avgWinRate * 10) / 10,
  };
}

export async function getRecentActivations() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return [];

  const { data: activations } = await supabase
    .from('license_activations')
    .select(`
      *,
      licenses!inner(
        product_id,
        products(name)
      )
    `)
    .eq('licenses.user_id', user.id)
    .order('activated_at', { ascending: false })
    .limit(5);

  return activations || [];
}
