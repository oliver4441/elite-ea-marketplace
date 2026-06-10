"use client";

import { useState } from "react";
import AdminSidebar from "@/components/dashboard/AdminSidebar";
import { 
  DollarSign, 
  Users, 
  ShoppingCart, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Calendar
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

const revenueData = [
  { name: "Jan", revenue: 4200, orders: 12 },
  { name: "Feb", revenue: 5800, orders: 18 },
  { name: "Mar", revenue: 4900, orders: 15 },
  { name: "Apr", revenue: 7200, orders: 22 },
  { name: "May", revenue: 6100, orders: 19 },
  { name: "Jun", revenue: 8400, orders: 28 },
];

const topProducts = [
  { name: "Elite Scalper v7", sales: 42, revenue: 20958 },
  { name: "Gold Sniper EA", sales: 31, revenue: 18569 },
  { name: "Trend Master Pro", sales: 28, revenue: 9772 },
];

const userGrowthData = [
  { name: "Jan", users: 45 },
  { name: "Feb", users: 62 },
  { name: "Mar", users: 78 },
  { name: "Apr", users: 104 },
  { name: "May", users: 136 },
  { name: "Jun", users: 172 },
];

export default function AdminAnalyticsPage() {
  const [dateRange, setDateRange] = useState("30d");

  const stats = [
    { label: "Total Revenue", value: "$68,450", change: "+18.2%", isUp: true, icon: DollarSign },
    { label: "Total Users", value: "172", change: "+12.5%", isUp: true, icon: Users },
    { label: "Total Orders", value: "134", change: "+8.7%", isUp: true, icon: ShoppingCart },
    { label: "Conversion Rate", value: "4.8%", change: "-0.3%", isUp: false, icon: TrendingUp },
  ];

  return (
    <div className="flex min-h-screen bg-black text-white">
      <AdminSidebar />

      <div className="flex-1 lg:ml-64 flex flex-col">
        <header className="h-20 border-b border-elite-border flex items-center justify-between px-8 bg-black/50 backdrop-blur-xl sticky top-0 z-40">
          <h1 className="text-xl font-bold">Analytics <span className="gold-text">Dashboard</span></h1>
        </header>

        <main className="p-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">Performance <span className="gold-text">Analytics</span></h2>
              <p className="text-gray-500 text-sm">Track revenue, user growth, and marketplace metrics.</p>
            </div>
            <div className="flex items-center space-x-2 bg-white/5 border border-elite-border rounded-lg p-1">
              {["7d", "30d", "90d", "1y"].map((range) => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${
                    dateRange === range
                      ? "bg-gold-gradient text-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {range === "7d" ? "7 Days" : range === "30d" ? "30 Days" : range === "90d" ? "90 Days" : "1 Year"}
                </button>
              ))}
            </div>
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
                    <span>{stat.change}</span>
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

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Revenue Chart */}
            <div className="glass-card p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-xl font-bold">Revenue Over Time</h3>
                  <p className="text-xs text-gray-500 mt-1">Monthly revenue trends</p>
                </div>
                <Calendar className="text-gray-500" size={20} />
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis dataKey="name" stroke="#666" fontSize={12} />
                    <YAxis stroke="#666" fontSize={12} tickFormatter={(v) => `$${v}`} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#121212", border: "1px solid rgba(212,175,55,0.2)", borderRadius: "8px" }}
                      itemStyle={{ color: "#D4AF37" }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#D4AF37" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* User Growth Chart */}
            <div className="glass-card p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-xl font-bold">User Growth</h3>
                  <p className="text-xs text-gray-500 mt-1">New registrations over time</p>
                </div>
                <Users className="text-gray-500" size={20} />
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis dataKey="name" stroke="#666" fontSize={12} />
                    <YAxis stroke="#666" fontSize={12} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#121212", border: "1px solid rgba(212,175,55,0.2)", borderRadius: "8px" }}
                      itemStyle={{ color: "#D4AF37" }}
                    />
                    <Bar dataKey="users" fill="#D4AF37" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Top Selling Products */}
          <div className="glass-card p-8">
            <h3 className="text-xl font-bold mb-6">Top <span className="gold-text">Selling Products</span></h3>
            <div className="space-y-4">
              {topProducts.map((product, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-lg border border-elite-border/50 hover:border-elite-gold/30 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gold-gradient/10 border border-elite-gold/20 rounded-lg flex items-center justify-center font-bold text-elite-gold text-sm">
                      #{i + 1}
                    </div>
                    <div>
                      <p className="font-bold">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-elite-gold">${product.revenue.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
