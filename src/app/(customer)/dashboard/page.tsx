import Sidebar from "@/components/dashboard/Sidebar";
import { 
  TrendingUp, 
  ShieldCheck, 
  Download, 
  AlertCircle,
  ArrowUpRight,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import { MOCK_BOTS } from "@/lib/mockData";

export default function DashboardPage() {
  const stats = [
    { label: "Active Licenses", value: "2", icon: ShieldCheck, color: "text-green-500" },
    { label: "Total Profit", value: "+$1,240", icon: TrendingUp, color: "text-elite-gold" },
    { label: "Avg Win Rate", value: "84%", icon: TrendingUp, color: "text-blue-500" },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 lg:ml-64 pt-32 pb-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-1">Welcome back, <span className="gold-text">Trader</span></h1>
              <p className="text-gray-500 text-sm">Monitor your EA performance and manage your licenses.</p>
            </div>
            <Link href="/bots" className="btn-gold py-2 px-6 text-sm">
              Browse More Bots
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {stats.map((stat, i) => (
              <div key={i} className="glass-card p-6 border-elite-border/40">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                  <span className="text-xs text-green-500 font-medium flex items-center">
                    +12% <ArrowUpRight size={14} className="ml-1" />
                  </span>
                </div>
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* My Active Bots */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">My Active Bots</h2>
                <Link href="/downloads" className="text-elite-gold text-sm hover:underline flex items-center">
                  All Downloads <ExternalLink size={14} className="ml-1" />
                </Link>
              </div>
              
              <div className="space-y-4">
                {MOCK_BOTS.slice(0, 2).map((bot) => (
                  <div key={bot.id} className="glass-card p-6 flex items-center justify-between border-elite-gold/10 hover:border-elite-gold/30 transition-all group">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center border border-elite-border group-hover:border-elite-gold/40 transition-colors">
                        <ShieldCheck className="text-elite-gold" />
                      </div>
                      <div>
                        <h3 className="font-bold">{bot.name}</h3>
                        <p className="text-xs text-gray-500">v1.2.0 • MetaTrader 4</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="hidden md:block text-right mr-4">
                        <p className="text-xs text-gray-500 uppercase">Status</p>
                        <p className="text-sm text-green-500 font-bold">Active</p>
                      </div>
                      <Link href="/downloads" className="bg-white/5 p-2 rounded-lg text-gray-400 hover:text-elite-gold border border-elite-border transition-colors">
                        <Download size={20} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications / Updates */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Latest Updates</h2>
              <div className="glass-card p-6 space-y-6">
                <div className="flex space-x-4">
                  <div className="bg-blue-500/10 p-2 rounded-lg h-fit">
                    <AlertCircle className="text-blue-500" size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold mb-1">New Update: Elite Scalper v7.1</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">Improved slippage management and news filter optimization. Download now.</p>
                    <p className="text-[10px] text-gray-600 mt-2">2 hours ago</p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="bg-green-500/10 p-2 rounded-lg h-fit">
                    <ShieldCheck className="text-green-500" size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold mb-1">License Activated</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">Your license for Gold Sniper EA has been successfully activated on VPS-NY-01.</p>
                    <p className="text-[10px] text-gray-600 mt-2">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
