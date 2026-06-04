"use client";

import { useEffect, useState } from "react";
import { 
  Users, 
  Package, 
  ShoppingCart, 
  ArrowUpRight, 
  ArrowDownRight,
  DollarSign,
  Loader2
} from "lucide-react";
import PerformanceChart from "@/components/charts/PerformanceChart";
import { getAllOrders, Order } from "@/lib/supabase/orders";
import { getProducts } from "@/lib/supabase/products";
import Link from "next/link";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [stats, setStats] = useState<({ label: string; value: string; trend: string; isUp: boolean; icon: any })[]>([]); 
  const [recentOrders, setRecentOrders] = useState<({ user: string; product: string; price: string; time: string; status: string })[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [orders, products] = await Promise.all([
        getAllOrders() as Promise<Order[]>,
        getProducts()
      ]);

      const totalRevenue = orders.reduce((acc: number, order: Order) => 
        order.payment_status === 'completed' ? acc + Number(order.amount) : acc, 0
      );

      const completedOrders = orders.filter((o: Order) => o.payment_status === 'completed').length;

      setStats([
        { label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, trend: "+0%", isUp: true, icon: DollarSign },
        { label: "Total Orders", value: orders.length.toString(), trend: "+0%", isUp: true, icon: ShoppingCart },
        { label: "Active Products", value: products.length.toString(), trend: "+0%", isUp: true, icon: Package },
        { label: "Completed Sales", value: completedOrders.toString(), trend: "+0%", isUp: true, icon: Users },
      ]);

      setRecentOrders(orders.slice(0, 5).map((order: Order) => ({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        user: (order as any).profile?.full_name || "Unknown",
        product: order.product?.name || "Product",
        price: `$${order.amount}`,
        time: new Date(order.created_at).toLocaleDateString(),
        status: order.payment_status
      })));
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="text-elite-gold animate-spin" size={40} />
        <p className="text-gray-500 font-medium">Loading dashboard analytics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Marketplace <span className="gold-text">Overview</span></h1>
        <p className="text-gray-500">Welcome back, Admin. Here&apos;s what&apos;s happening with your marketplace today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white/5 border border-elite-border rounded-xl text-elite-gold">
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center space-x-1 text-xs font-bold ${stat.isUp ? 'text-green-500' : 'text-red-500'}`}>
                <span>{stat.trend}</span>
                {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2 glass-card p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold">Sales Performance</h2>
            <select className="bg-black/40 border border-elite-border rounded-lg px-4 py-2 text-xs outline-none focus:border-elite-gold cursor-pointer">
              <option>Last 30 Days</option>
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-[400px]">
            <PerformanceChart />
          </div>
        </div>

        {/* Recent Orders */}
        <div className="glass-card p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold">Recent Orders</h2>
            <Link href="/admin/orders" className="text-xs text-elite-gold hover:underline">View All</Link>
          </div>
          <div className="space-y-6">
            {recentOrders.length === 0 ? (
              <p className="text-center text-gray-500 py-10">No orders yet.</p>
            ) : recentOrders.map((order, i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/5 border border-elite-border rounded-lg flex items-center justify-center text-xs font-bold text-gray-400 group-hover:border-elite-gold/50 transition-colors">
                    {order.user.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{order.user}</p>
                    <p className="text-xs text-gray-500">{order.product}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-elite-gold">{order.price}</p>
                  <p className="text-[10px] text-gray-600 uppercase">{order.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
