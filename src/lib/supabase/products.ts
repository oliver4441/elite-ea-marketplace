import { supabase } from "./client";
import { EAProduct } from "../mockData";

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return data as EAProduct[];
}

export async function getProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(`Error fetching product with slug ${slug}:`, error);
    return null;
  }

  return data as EAProduct;
}

export async function createProduct(product: Omit<EAProduct, "id">) {
  const { data, error } = await supabase
    .from("products")
    .insert([product])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as EAProduct;
}

export async function updateProduct(id: string, updates: Partial<EAProduct>) {
  const { data, error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as EAProduct;
}

export async function deleteProduct(id: string) {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }

  return true;
}
