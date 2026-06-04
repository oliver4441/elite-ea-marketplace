"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getProductById, updateProduct } from "@/lib/supabase/products";
import ProductForm from "@/components/admin/ProductForm";
import { EAProduct } from "@/lib/mockData";
import { Loader2 } from "lucide-react";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [product, setProduct] = useState<EAProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    const data = await getProductById(id);
    if (data) {
      setProduct(data);
    } else {
      alert("Product not found");
      router.push("/admin/products");
    }
    setLoading(false);
  };

  const handleSubmit = async (data: Omit<EAProduct, "id">) => {
    setSubmitting(true);
    try {
      await updateProduct(id, data);
      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please check the console for details.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="text-elite-gold animate-spin" size={40} />
        <p className="text-gray-500 font-medium">Loading product data...</p>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Edit <span className="gold-text">Product</span></h1>
        <p className="text-gray-500 text-sm">Update the details for {product.name}.</p>
      </div>

      <ProductForm initialData={product} onSubmit={handleSubmit} loading={submitting} />
    </div>
  );
}
