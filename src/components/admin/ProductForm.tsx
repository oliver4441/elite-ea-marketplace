"use client";

import { useState } from "react";
import { EAProduct } from "@/lib/mockData";
import { Loader2, Save, X } from "lucide-react";
import Link from "next/link";

interface ProductFormProps {
  initialData?: EAProduct;
  onSubmit: (data: Omit<EAProduct, "id">) => Promise<void>;
  loading: boolean;
}

export default function ProductForm({ initialData, onSubmit, loading }: ProductFormProps) {
  const [formData, setFormData] = useState<Omit<EAProduct, "id">>({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    short_description: initialData?.short_description || "",
    description: initialData?.description || "",
    price_lifetime: initialData?.price_lifetime || 0,
    price_monthly: initialData?.price_monthly || 0,
    win_rate: initialData?.win_rate || 0,
    drawdown: initialData?.drawdown || 0,
    profit_factor: initialData?.profit_factor || 0,
    pairs: initialData?.pairs || [],
    timeframes: initialData?.timeframes || [],
    risk_level: initialData?.risk_level || "Medium",
  });

  const [pairInput, setPairInput] = useState("");
  const [timeframeInput, setTimeframeInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes("price") || name.includes("rate") || name.includes("drawdown") || name.includes("profit") 
        ? parseFloat(value) 
        : value
    }));
  };

  const handleAddPair = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && pairInput.trim()) {
      e.preventDefault();
      if (!formData.pairs.includes(pairInput.trim().toUpperCase())) {
        setFormData(prev => ({ ...prev, pairs: [...prev.pairs, pairInput.trim().toUpperCase()] }));
      }
      setPairInput("");
    }
  };

  const removePair = (pair: string) => {
    setFormData(prev => ({ ...prev, pairs: prev.pairs.filter(p => p !== pair) }));
  };

  const handleAddTimeframe = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && timeframeInput.trim()) {
      e.preventDefault();
      if (!formData.timeframes.includes(timeframeInput.trim().toUpperCase())) {
        setFormData(prev => ({ ...prev, timeframes: [...prev.timeframes, timeframeInput.trim().toUpperCase()] }));
      }
      setTimeframeInput("");
    }
  };

  const removeTimeframe = (tf: string) => {
    setFormData(prev => ({ ...prev, timeframes: prev.timeframes.filter(t => t !== tf) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6 space-y-6">
            <h2 className="text-xl font-bold">Product <span className="gold-text">Details</span></h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Product Name</label>
                <input 
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text" 
                  placeholder="e.g. Elite Scalper v7"
                  className="w-full bg-black/40 border border-elite-border rounded-lg px-4 py-3 outline-none focus:border-elite-gold transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Slug (URL identifier)</label>
                <input 
                  required
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  type="text" 
                  placeholder="e.g. elite-scalper-v7"
                  className="w-full bg-black/40 border border-elite-border rounded-lg px-4 py-3 outline-none focus:border-elite-gold transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Short Description</label>
                <textarea 
                  required
                  name="short_description"
                  value={formData.short_description}
                  onChange={handleChange}
                  rows={2}
                  placeholder="A brief overview of the EA..."
                  className="w-full bg-black/40 border border-elite-border rounded-lg px-4 py-3 outline-none focus:border-elite-gold transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Full Description</label>
                <textarea 
                  required
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Detailed features, strategy and requirements..."
                  className="w-full bg-black/40 border border-elite-border rounded-lg px-4 py-3 outline-none focus:border-elite-gold transition-all resize-none"
                />
              </div>
            </div>
          </div>

          <div className="glass-card p-6 space-y-6">
            <h2 className="text-xl font-bold">Technical <span className="gold-text">Specs</span></h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Trading Pairs (Press Enter)</label>
                <input 
                  value={pairInput}
                  onChange={(e) => setPairInput(e.target.value)}
                  onKeyDown={handleAddPair}
                  type="text" 
                  placeholder="e.g. EURUSD"
                  className="w-full bg-black/40 border border-elite-border rounded-lg px-4 py-3 outline-none focus:border-elite-gold transition-all mb-3"
                />
                <div className="flex flex-wrap gap-2">
                  {formData.pairs.map(pair => (
                    <span key={pair} className="bg-elite-gold/10 border border-elite-gold/20 text-elite-gold text-[10px] font-bold px-2 py-1 rounded flex items-center space-x-1">
                      <span>{pair}</span>
                      <X size={12} className="cursor-pointer hover:text-white" onClick={() => removePair(pair)} />
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Timeframes (Press Enter)</label>
                <input 
                  value={timeframeInput}
                  onChange={(e) => setTimeframeInput(e.target.value)}
                  onKeyDown={handleAddTimeframe}
                  type="text" 
                  placeholder="e.g. M1, M5"
                  className="w-full bg-black/40 border border-elite-border rounded-lg px-4 py-3 outline-none focus:border-elite-gold transition-all mb-3"
                />
                <div className="flex flex-wrap gap-2">
                  {formData.timeframes.map(tf => (
                    <span key={tf} className="bg-elite-gold/10 border border-elite-gold/20 text-elite-gold text-[10px] font-bold px-2 py-1 rounded flex items-center space-x-1">
                      <span>{tf}</span>
                      <X size={12} className="cursor-pointer hover:text-white" onClick={() => removeTimeframe(tf)} />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6">
          <div className="glass-card p-6 space-y-6">
            <h2 className="text-xl font-bold">Pricing & <span className="gold-text">Stats</span></h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Lifetime Price ($)</label>
                <input 
                  required
                  name="price_lifetime"
                  value={formData.price_lifetime}
                  onChange={handleChange}
                  type="number" 
                  className="w-full bg-black/40 border border-elite-border rounded-lg px-4 py-3 outline-none focus:border-elite-gold transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Monthly Price ($)</label>
                <input 
                  required
                  name="price_monthly"
                  value={formData.price_monthly}
                  onChange={handleChange}
                  type="number" 
                  className="w-full bg-black/40 border border-elite-border rounded-lg px-4 py-3 outline-none focus:border-elite-gold transition-all"
                />
              </div>

              <div className="pt-4 border-t border-elite-border/50">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Win Rate (%)</label>
                    <input 
                      required
                      name="win_rate"
                      value={formData.win_rate}
                      onChange={handleChange}
                      type="number" 
                      step="0.1"
                      className="w-full bg-black/40 border border-elite-border rounded-lg px-4 py-3 outline-none focus:border-elite-gold transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Max DD (%)</label>
                    <input 
                      required
                      name="drawdown"
                      value={formData.drawdown}
                      onChange={handleChange}
                      type="number" 
                      step="0.1"
                      className="w-full bg-black/40 border border-elite-border rounded-lg px-4 py-3 outline-none focus:border-elite-gold transition-all"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Profit Factor</label>
                <input 
                  required
                  name="profit_factor"
                  value={formData.profit_factor}
                  onChange={handleChange}
                  type="number" 
                  step="0.01"
                  className="w-full bg-black/40 border border-elite-border rounded-lg px-4 py-3 outline-none focus:border-elite-gold transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Risk Level</label>
                <select 
                  name="risk_level"
                  value={formData.risk_level}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-elite-border rounded-lg px-4 py-3 outline-none focus:border-elite-gold transition-all appearance-none cursor-pointer"
                >
                  <option value="Low">Low Risk</option>
                  <option value="Medium">Medium Risk</option>
                  <option value="High">High Risk</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button 
              type="submit" 
              disabled={loading}
              className="btn-gold py-4 px-6 flex items-center justify-center space-x-2 text-sm w-full"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              <span>{initialData ? "Update Product" : "Publish Product"}</span>
            </button>
            <Link 
              href="/admin/products" 
              className="bg-white/5 border border-elite-border text-gray-400 hover:text-white hover:bg-white/10 transition-all py-4 px-6 flex items-center justify-center space-x-2 text-sm rounded-lg"
            >
              <X size={18} />
              <span>Cancel</span>
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
