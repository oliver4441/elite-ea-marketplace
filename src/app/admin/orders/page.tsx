"use client";

import { useEffect, useState } from "react";
import { 
  Search, 
  Filter, 
  Eye, 
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  Loader2,
  ShoppingCart
} from "lucide-react";
import { getAllOrders, Order } from "@/lib/supabase/orders";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const data = await getAllOrders();
    setOrders(data as Order[]);
    setLoading(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <div className="flex items-center space-x-2 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full w-fit">
            <CheckCircle2 size={12} className="text-green-500" />
            <span className="text-[10px] text-green-500 font-bold uppercase">Completed</span>
          </div>
        );
      case 'pending':
        return (
          <div className="flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full w-fit">
            <Clock size={12} className="text-yellow-500" />
            <span className="text-[10px] text-yellow-500 font-bold uppercase">Pending</span>
          </div>
        );
      case 'failed':
        return (
          <div className="flex items-center space-x-2 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full w-fit">
            <AlertCircle size={12} className="text-red-500" />
            <span className="text-[10px] text-red-500 font-bold uppercase">Failed</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Order <span className="gold-text">History</span></h1>
        <p className="text-gray-500 text-sm">Track and manage all marketplace transactions and license purchases.</p>
      </div>

      {/* Filter Bar */}
      <div className="glass-card p-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search by order ID, customer or email..." 
            className="w-full bg-black/40 border border-elite-border rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-elite-gold transition-all"
          />
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center space-x-2 bg-white/5 border border-elite-border rounded-lg px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
            <Filter size={18} />
            <span>Filter</span>
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center space-x-2 bg-white/5 border border-elite-border rounded-lg px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
            <Download size={18} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="glass-card overflow-hidden min-h-[400px] flex flex-col">
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="text-elite-gold animate-spin" size={40} />
            <p className="text-gray-500 font-medium">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4">
            <ShoppingCart className="text-gray-600" size={48} />
            <p className="text-gray-500 font-medium">No orders found yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-elite-border bg-white/5">
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order ID</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Customer</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Product</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Amount</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-elite-border/50">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <span className="font-mono text-[10px] font-bold text-elite-gold">{order.id.split('-')[0].toUpperCase()}</span>
                      <p className="text-[10px] text-gray-600 uppercase mt-1">{new Date(order.created_at).toLocaleDateString()}</p>
                    </td>
                    <td className="px-6 py-4">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      <p className="font-bold text-white">{(order as any).profile?.full_name || "Unknown"}</p>
                      <p className="text-xs text-gray-500">Customer</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <p className="text-sm font-medium">{order.product?.name || "Product"}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <p className="text-sm font-bold text-white">${order.amount}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        {getStatusBadge(order.status)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-gray-400 hover:text-elite-gold hover:bg-white/5 rounded-lg transition-all" title="View Details">
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {!loading && orders.length > 0 && (
          <div className="px-6 py-4 border-t border-elite-border flex items-center justify-between">
            <p className="text-xs text-gray-500">Showing {orders.length} transactions</p>
            <button className="text-xs text-elite-gold hover:underline font-bold">View Full History</button>
          </div>
        )}
      </div>
    </div>
  );
}
