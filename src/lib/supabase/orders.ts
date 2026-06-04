import { supabase } from "./client";

export interface UserProfile {
  id: string;
  full_name: string;
  avatar_url?: string;
  role: 'admin' | 'customer';
}

export interface Order {
  id: string;
  created_at: string;
  user_id: string;
  product_id: string;
  amount: number;
  payment_status: 'pending' | 'completed' | 'failed';
  transaction_id?: string;
  mpesa_checkout_id?: string;
  mpesa_receipt_number?: string;
  phone_number?: string;
  product?: {
    name: string;
    slug: string;
  };
}

export async function getProfile(id: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }

  return data as UserProfile;
}

export async function getUserOrders(userId: string) {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      product:products(name, slug)
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching user orders:", error);
    return [];
  }

  return data as Order[];
}

export async function getAllOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      product:products(name, slug),
      profile:profiles(full_name)
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching all orders:", error);
    return [];
  }

  return data;
}
