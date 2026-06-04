import Sidebar from "@/components/dashboard/Sidebar";
import { 
  TrendingUp, 
  ShieldCheck, 
  Download, 
  AlertCircle,
  ArrowUpRight,
  ExternalLink,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { getDashboardStats, getRecentActivations } from "@/lib/supabase/dashboard";
import { formatCurrency } from "@/lib/utils/helpers";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const isWaitingPayment = params.waiting_payment === "true";
  const isSuccess = params.success === "true";

  const statsData = await getDashboardStats();
  const recentActivations = await getRecentActivations();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const stats = [
    { label: "Active Licenses", value: statsData?.activeLicenses.toString() || "0", icon: ShieldCheck, color: "text-green-500" },
    { label: "Total Profit", value: formatCurrency(statsData?.totalProfit || 0), icon: TrendingUp, color: "text-elite-gold" },
    { label: "Avg Win Rate", value: `${statsData?.avgWinRate || 0}%`, icon: TrendingUp, color: "text-blue-500" },
  ];

  // Fetch user's licenses for "My Active Bots"
  const { data: userLicenses } = await supabase
    .from('licenses')
    .select('*, products(*)')
    .eq('user_id', user?.id)
    .limit(3);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 lg:ml-64 pt-32 pb-12 px-6">
        <div className="container mx-auto max-w-6xl">
          {isWaitingPayment && (
            <div className="mb-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center space-x-3 text-blue-500 animate-pulse">
              <Loader2 className="animate-spin" size={20} />
              <p className="text-sm font-medium">
                We are processing your M-Pesa payment. Your license will appear here automatically once confirmed.
              </p>
            </div>
          )}

          {isSuccess && (
            <div className="mb-8 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center space-x-3 text-green-500 animate-in fade-in zoom-in duration-300">
              <ShieldCheck size={20} />
              <p className="text-sm font-medium">
                Payment successful! Your new license has been activated and is ready for use.
              </p>
            </div>
          )}

          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-1">Welcome back, <span className="gold-text">{user?.user_metadata?.full_name?.split(' ')[0] || 'Trader'}</span></h1>
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
                <Link href="/licenses" className="text-elite-gold text-sm hover:underline flex items-center">
                  All Licenses <ExternalLink size={14} className="ml-1" />
                </Link>
              </div>
              
              <div className="space-y-4">
                {userLicenses && userLicenses.length > 0 ? (
                  userLicenses.map((license: any) => (
                    <div key={license.id} className="glass-card p-6 flex items-center justify-between border-elite-gold/10 hover:border-elite-gold/30 transition-all group">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center border border-elite-border group-hover:border-elite-gold/40 transition-colors">
                          <ShieldCheck className="text-elite-gold" />
                        </div>
                        <div>
                          <h3 className="font-bold">{license.products.name}</h3>
                          <p className="text-xs text-gray-500">{license.license_key} • {license.status}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="hidden md:block text-right mr-4">
                          <p className="text-xs text-gray-500 uppercase">Activations</p>
                          <p className="text-sm text-green-500 font-bold">{license.activation_count}/{license.max_activations}</p>
                        </div>
                        <Link href="/downloads" className="bg-white/5 p-2 rounded-lg text-gray-400 hover:text-elite-gold border border-elite-border transition-colors">
                          <Download size={20} />
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="glass-card p-12 text-center">
                    <p className="text-gray-500 mb-4">You don&apos;t have any active licenses yet.</p>
                    <Link href="/bots" className="text-elite-gold font-bold hover:underline">
                      Browse Expert Advisors
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Notifications / Updates */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Latest Activations</h2>
              <div className="glass-card p-6 space-y-6">
                {recentActivations.length > 0 ? (
                  recentActivations.map((activation: any) => (
                    <div key={activation.id} className="flex space-x-4">
                      <div className="bg-green-500/10 p-2 rounded-lg h-fit">
                        <ShieldCheck className="text-green-500" size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold mb-1">Activated: {activation.licenses.products.name}</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">Machine ID: {activation.machine_id.substring(0, 12)}...</p>
                        <p className="text-[10px] text-gray-600 mt-2">{new Date(activation.activated_at).toLocaleString()}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-500">No recent activations found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
