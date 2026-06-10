"use client";

import { useEffect, useState, useMemo } from "react";
import BotCard from "@/components/marketplace/BotCard";
import { EAProduct } from "@/lib/mockData";
import { getProducts } from "@/lib/supabase/products";
import { Search, Filter } from "lucide-react";

type RiskFilter = "All" | "Low" | "Medium" | "High";

export default function BotsPage() {
  const [products, setProducts] = useState<EAProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState<RiskFilter>("All");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBots = async () => {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchBots();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((bot) => {
      const matchesSearch =
        searchQuery === "" ||
        bot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bot.short_description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRisk = riskFilter === "All" || bot.risk_level === riskFilter;
      return matchesSearch && matchesRisk;
    });
  }, [products, searchQuery, riskFilter]);

  const riskFilters: RiskFilter[] = ["All", "Low", "Medium", "High"];

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-elite-surface border border-elite-border rounded-lg pl-10 pr-4 py-2 focus:border-elite-gold outline-none transition-colors w-full md:w-64"
              />
            </div>
            <div className="relative">
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className={`border p-2 rounded-lg transition-colors ${
                  riskFilter !== "All"
                    ? "bg-elite-gold/10 border-elite-gold/40 text-elite-gold"
                    : "bg-elite-surface border-elite-border text-gray-400 hover:text-elite-gold"
                }`}
              >
                <Filter size={20} />
              </button>
              {showFilterDropdown && (
                <div className="absolute right-0 top-full mt-2 bg-elite-surface border border-elite-border rounded-lg shadow-xl z-20 min-w-[140px]">
                  {riskFilters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => {
                        setRiskFilter(filter);
                        setShowFilterDropdown(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-white/5 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        riskFilter === filter ? "text-elite-gold font-bold" : "text-gray-400"
                      }`}
                    >
                      {filter === "All" ? "All Risk Levels" : `${filter} Risk`}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Active filter indicator */}
        {riskFilter !== "All" && (
          <div className="mb-6 flex items-center space-x-2">
            <span className="text-sm text-gray-500">Filtered by:</span>
            <span className="bg-elite-gold/10 border border-elite-gold/30 text-elite-gold text-xs font-bold px-3 py-1 rounded-full">
              {riskFilter} Risk
            </span>
            <button
              onClick={() => setRiskFilter("All")}
              className="text-xs text-gray-500 hover:text-white underline"
            >
              Clear
            </button>
          </div>
        )}

        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Loading bots...</p>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((bot) => (
                <BotCard key={bot.id} bot={bot} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">
                  {searchQuery || riskFilter !== "All"
                    ? "No bots match your search criteria. Try adjusting your filters."
                    : "No Expert Advisors available at the moment. Please check back later."}
                </p>
              </div>
            )}
          </>
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
