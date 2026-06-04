"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/lib/supabase/products";
import ProductForm from "@/components/admin/ProductForm";
import { EAProduct } from "@/lib/mockData";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: Omit<EAProduct, "id">) => {
    setLoading(true);
    try {
      await createProduct(data);
      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product. Please check the console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Add New <span className="gold-text">Product</span></h1>
        <p className="text-gray-500 text-sm">Launch a new Expert Advisor to the marketplace.</p>
      </div>

      <ProductForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
