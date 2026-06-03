import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/supabase/products";
import PerformanceChart from "@/components/charts/PerformanceChart";
import { CheckCircle2, TrendingUp, Activity, Shield, Download, Zap } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BotDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const bot = await getProductBySlug(slug);

  if (!bot) {
    notFound();
  }

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-elite-gold/10 border border-elite-gold/20 px-4 py-1 rounded-full mb-4">
              <Shield className="text-elite-gold" size={14} />
              <span className="text-xs text-elite-gold font-bold uppercase tracking-wider">Verified Performance</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{bot.name}</h1>
            <p className="text-xl text-gray-400 leading-relaxed">{bot.short_description}</p>
          </div>
          
          <div className="glass-card p-6 min-w-[300px] border-elite-gold/30">
            <p className="text-sm text-gray-500 uppercase mb-2">Lifetime License</p>
            <p className="text-4xl font-bold mb-6">${bot.price_lifetime}</p>
            <button className="btn-gold w-full mb-4 flex items-center justify-center space-x-2">
              <span>Buy Now</span>
              <Zap size={20} />
            </button>
            <p className="text-center text-xs text-gray-500">Includes 1 year of updates & support</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Win Rate", value: `${bot.win_rate}%`, icon: TrendingUp },
            { label: "Profit Factor", value: bot.profit_factor, icon: Zap },
            { label: "Max Drawdown", value: `${bot.drawdown}%`, icon: Activity },
            { label: "Risk Level", value: bot.risk_level, icon: Shield },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-6 flex flex-col items-center text-center">
              <stat.icon className="text-elite-gold mb-4" size={24} />
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Performance Chart & Details */}
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <PerformanceChart />
            
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-6">Technical Strategy</h2>
              <p className="text-gray-400 leading-relaxed mb-6">{bot.description}</p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold mb-4 text-elite-gold">Supported Pairs</h3>
                  <div className="flex flex-wrap gap-2">
                    {bot.pairs.map((p) => (
                      <span key={p} className="bg-white/5 border border-elite-border px-3 py-1 rounded-md text-sm font-mono">{p}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-4 text-elite-gold">Timeframes</h3>
                  <div className="flex flex-wrap gap-2">
                    {bot.timeframes.map((t) => (
                      <span key={t} className="bg-white/5 border border-elite-border px-3 py-1 rounded-md text-sm font-mono">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold mb-6">What&apos;s Included?</h3>
              <ul className="space-y-4">
                {[
                  "EA File (.ex4 / .ex5)",
                  "PDF Installation Guide",
                  "Optimized Set Files",
                  "Video Documentation",
                  "Dedicated VPS Support",
                  "Lifetime Updates",
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3 text-sm text-gray-300">
                    <CheckCircle2 className="text-elite-gold flex-shrink-0" size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button className="btn-outline-gold w-full mt-8 flex items-center justify-center space-x-2">
                <Download size={18} />
                <span>Download PDF Guide</span>
              </button>
            </div>

            <div className="glass-card p-8 bg-elite-gold/5 border-elite-gold/20">
              <h3 className="text-xl font-bold mb-4">Limited Offer!</h3>
              <p className="text-sm text-gray-400 mb-6">
                Get <span className="text-white font-bold">20% OFF</span> on your first purchase using the code: <span className="text-elite-gold font-mono font-bold">ELITE20</span>
              </p>
              <div className="bg-black/40 border border-dashed border-elite-gold/40 p-3 rounded text-center text-xs font-mono uppercase tracking-widest text-elite-gold">
                ELITE20
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
