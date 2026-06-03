import PerformanceChart from "@/components/charts/PerformanceChart";
import { TrendingUp, Award, Clock, Users } from "lucide-react";

export default function PerformancePage() {
  const highlightStats = [
    { label: "Verified Profit", value: "$420,150+", icon: Award, color: "text-elite-gold" },
    { label: "Avg Monthly Return", value: "12.4%", icon: TrendingUp, color: "text-green-500" },
    { label: "Active Investors", value: "1,200+", icon: Users, color: "text-blue-500" },
    { label: "Market Uptime", value: "99.9%", icon: Clock, color: "text-purple-500" },
  ];

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Transparent <span className="gold-text">Performance</span>
          </h1>
          <p className="text-xl text-gray-400">
            Real-time verified results from our master accounts. We believe in absolute transparency 
            and data-driven trading.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {highlightStats.map((stat, i) => (
            <div key={i} className="glass-card p-8 flex flex-col items-center text-center">
              <div className={`p-3 rounded-xl bg-white/5 mb-4 ${stat.color}`}>
                <stat.icon size={28} />
              </div>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2">
            <PerformanceChart />
            
            <div className="mt-12 space-y-8">
              <h2 className="text-3xl font-bold">Why Our Data Matters</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-elite-gold">Institutional Verification</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Our accounts are connected via MetaAPI and MyFXBook, ensuring that every trade, 
                    pip, and profit dollar is 100% authentic and unmanipulated.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-elite-gold">Real-Time Sync</h3>
                  <p className="text-gray-400 leading-relaxed">
                    The charts above sync every 15 minutes with our primary trading servers, 
                    providing you with the most up-to-date performance metrics possible.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold mb-6">Master Accounts</h3>
              <div className="space-y-4">
                {[
                  { name: "Aggressive Scalp Master", balance: "$52,400", return: "+185%" },
                  { name: "Conservative Trend Master", balance: "$128,000", return: "+42%" },
                  { name: "Gold Sniper Specialist", balance: "$15,200", return: "+310%" },
                ].map((account, i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-lg border border-elite-border flex justify-between items-center">
                    <div>
                      <p className="font-bold text-sm">{account.name}</p>
                      <p className="text-xs text-gray-500">Bal: {account.balance}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-500 font-bold">{account.return}</p>
                      <p className="text-[10px] text-gray-600 uppercase">All-time</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn-outline-gold w-full mt-8">View MyFXBook Profile</button>
            </div>

            <div className="glass-card p-8 bg-elite-gold/5 border-elite-gold/20">
              <h3 className="text-xl font-bold mb-4">Ready to Automate?</h3>
              <p className="text-sm text-gray-400 mb-6">
                Join 5,000+ traders already using Elite EA to optimize their portfolios.
              </p>
              <button className="btn-gold w-full">Get Started Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
