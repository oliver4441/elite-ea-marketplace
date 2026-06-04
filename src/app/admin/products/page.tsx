"use client";

import { useEffect, useState } from "react";
import { EAProduct } from "@/lib/mockData";
import { getProducts, deleteProduct } from "@/lib/supabase/products";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  ExternalLink,
  CheckCircle2,
  Loader2,
  Package
} from "lucide-react";
import Link from "next/link";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<EAProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    try {
      await deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      alert("Error deleting product");
      console.error(error);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Product <span className="gold-text">Management</span></h1>
          <p className="text-gray-500 text-sm">Create, edit, and manage your Expert Advisor catalog.</p>
        </div>
        <Link href="/admin/products/new" className="btn-gold py-3 px-6 flex items-center justify-center space-x-2 text-sm">
          <Plus size={18} />
          <span>Add New EA</span>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="glass-card p-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search products by name, slug or ID..." 
            className="w-full bg-black/40 border border-elite-border rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-elite-gold transition-all"
          />
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center space-x-2 bg-white/5 border border-elite-border rounded-lg px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
            <Filter size={18} />
            <span>Filter</span>
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center space-x-2 bg-white/5 border border-elite-border rounded-lg px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="glass-card overflow-hidden min-h-[400px] flex flex-col">
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="text-elite-gold animate-spin" size={40} />
            <p className="text-gray-500 font-medium">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4">
            <Package className="text-gray-600" size={48} />
            <p className="text-gray-500 font-medium">No products found. Create your first EA!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-elite-border bg-white/5">
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Product</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Price</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Stats</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-elite-border/50">
                {products.map((bot) => (
                  <tr key={bot.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gold-gradient/10 border border-elite-gold/20 rounded-lg flex items-center justify-center font-bold text-elite-gold">
                          {bot.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-white group-hover:text-elite-gold transition-colors">{bot.name}</p>
                          <p className="text-xs text-gray-500 font-mono">{bot.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <p className="text-sm font-bold text-white">${bot.price_lifetime}</p>
                      <p className="text-[10px] text-gray-500">Lifetime</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col items-center space-y-1">
                        <div className="flex items-center space-x-4 text-[10px] font-bold uppercase tracking-tighter">
                          <span className="text-green-500">{bot.win_rate}% WR</span>
                          <span className="text-red-400">{bot.drawdown}% DD</span>
                        </div>
                        <div className="text-[10px] text-gray-500">{bot.risk_level} Risk</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center">
                        <div className="flex items-center space-x-2 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full">
                          <CheckCircle2 size={12} className="text-green-500" />
                          <span className="text-[10px] text-green-500 font-bold uppercase">Active</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <Link 
                          href={`/admin/products/${bot.id}/edit`}
                          className="p-2 text-gray-400 hover:text-elite-gold hover:bg-white/5 rounded-lg transition-all" 
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(bot.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-white/5 rounded-lg transition-all" 
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                        <Link href={`/bots/${bot.slug}`} target="_blank" className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all" title="View Public Page">
                          <ExternalLink size={18} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {!loading && products.length > 0 && (
          <div className="px-6 py-4 border-t border-elite-border flex items-center justify-between">
            <p className="text-xs text-gray-500">Showing {products.length} products</p>
            <div className="flex items-center space-x-2">
              <button disabled className="px-3 py-1 bg-white/5 border border-elite-border rounded text-xs text-gray-600 disabled:opacity-50">Prev</button>
              <button className="px-3 py-1 bg-elite-gold text-black border border-elite-gold rounded text-xs font-bold">1</button>
              <button disabled className="px-3 py-1 bg-white/5 border border-elite-border rounded text-xs text-gray-600 disabled:opacity-50">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
