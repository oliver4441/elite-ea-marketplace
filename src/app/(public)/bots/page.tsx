import BotCard from "@/components/marketplace/BotCard";
import { getProducts } from "@/lib/supabase/products";
import { Search, Filter } from "lucide-react";

export default async function BotsPage() {
  const products = await getProducts();

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Explore Our <span className="gold-text">EA Collection</span>
            </h1>
            <p className="text-gray-400">
              Discover high-performance Expert Advisors tailored for various trading styles, 
              from aggressive scalping to conservative trend following.
            </p>
          </div>
          
          <div className="flex space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text" 
                placeholder="Search bots..." 
                className="bg-elite-surface border border-elite-border rounded-lg pl-10 pr-4 py-2 focus:border-elite-gold outline-none transition-colors w-full md:w-64"
              />
            </div>
            <button className="bg-elite-surface border border-elite-border p-2 rounded-lg text-gray-400 hover:text-elite-gold transition-colors">
              <Filter size={20} />
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((bot) => (
            <BotCard key={bot.id} bot={bot} />
          ))}
        </div>
        
        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No Expert Advisors available at the moment. Please check back later.</p>
          </div>
        )}
        
        {/* Risk Disclaimer */}
        <div className="mt-20 p-8 glass-card border-red-500/20 bg-red-500/5">
          <h3 className="text-lg font-bold mb-2 text-red-400 flex items-center">
            <span className="w-2 h-2 bg-red-400 rounded-full mr-2" />
            Risk Warning
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Forex and CFD trading involves significant risk to your invested capital. You should not invest more than you can afford to lose and should ensure that you fully understand the risks involved. Trading leveraged products may not be suitable for all investors. Before trading, please take into consideration your level of experience, investment objectives and seek independent financial advice if necessary.
          </p>
        </div>
      </div>
    </div>
  );
}
