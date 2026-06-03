"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Link from "next/link";
import { ShieldCheck, Copy, ExternalLink, AlertTriangle, Key, Loader2, Package } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { getUserOrders } from "@/lib/supabase/orders";

interface License {
  id: string;
  product?: {
    name: string;
    slug: string;
  };
  key: string;
  status: string;
  activations: number;
  max_activations: number;
  expires_at: string;
}

export default function LicensesPage() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLicenses();
  }, []);

  const fetchLicenses = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const orders = await getUserOrders(user.id);
        const activeLicenses = orders.filter(o => o.status === 'completed').map(o => ({
          id: o.id,
          product: o.product,
          key: o.license_key || "PENDING-KEY",
          status: "active",
          activations: 0,
          max_activations: 1,
          expires_at: "Lifetime",
        }));
        setLicenses(activeLicenses);
      }
    } catch (error) {
      console.error("Error fetching licenses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 lg:ml-64 pt-32 pb-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-1">My <span className="gold-text">Licenses</span></h1>
            <p className="text-gray-500 text-sm">Manage your EA activations and view your license keys.</p>
          </div>

          <div className="min-h-[400px] flex flex-col">
            {loading ? (
              <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                <Loader2 className="text-elite-gold animate-spin" size={40} />
                <p className="text-gray-500 font-medium">Fetching your licenses...</p>
              </div>
            ) : licenses.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center space-y-6 glass-card p-12 text-center border-elite-gold/10">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-elite-border">
                  <Package className="text-gray-600" size={40} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">No active licenses found</h3>
                  <p className="text-gray-500 max-w-sm mx-auto">
                    You haven&apos;t purchased any Expert Advisors yet. Explore the marketplace to find the perfect bot for your strategy.
                  </p>
                </div>
                <Link href="/bots" className="btn-gold py-3 px-8">
                  Browse Marketplace
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {licenses.map((license) => (
                  <div key={license.id} className="glass-card overflow-hidden border-elite-gold/10">
                    <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex items-center space-x-6">
                        <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center border border-elite-border">
                          <ShieldCheck className="text-elite-gold" size={32} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-1">{license.product?.name}</h3>
                          <div className="flex items-center space-x-3 text-xs uppercase tracking-wider">
                            <span className={`font-bold ${license.status === 'active' ? 'text-green-500' : 'text-red-400'}`}>
                              ● {license.status}
                            </span>
                            <span className="text-gray-500">|</span>
                            <span className="text-gray-400">{license.expires_at} License</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-black/40 border border-elite-border rounded-lg p-4 flex items-center justify-between min-w-[300px]">
                        <div className="mr-4">
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">License Key</p>
                          <p className="font-mono text-sm text-elite-gold">{license.key}</p>
                        </div>
                        <button 
                          onClick={() => handleCopy(license.key)}
                          className="p-2 hover:bg-white/5 rounded transition-colors text-gray-400 hover:text-elite-gold"
                        >
                          {copiedKey === license.key ? <ShieldCheck size={18} className="text-green-500" /> : <Copy size={18} />}
                        </button>
                      </div>
                    </div>

                    <div className="px-6 md:px-8 py-4 bg-white/5 border-t border-elite-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center space-x-8">
                        <div>
                          <p className="text-[10px] text-gray-500 uppercase mb-1">Activations</p>
                          <p className="text-sm font-bold">{license.activations} / {license.max_activations}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 uppercase mb-1">Platform</p>
                          <p className="text-sm font-bold">MetaTrader 4/5</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <button className="text-xs text-gray-400 hover:text-white flex items-center">
                          <AlertTriangle size={14} className="mr-1" /> Revoke Activation
                        </button>
                        <Link href={`/bots/${license.product?.slug}`} className="btn-gold py-2 px-6 text-xs flex items-center">
                          Manage Bot <ExternalLink size={14} className="ml-2" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-12 p-8 glass-card border-elite-gold/20 bg-elite-gold/5 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Key className="text-elite-gold" size={32} />
              <div>
                <h3 className="font-bold">Need more activations?</h3>
                <p className="text-sm text-gray-400">Upgrade your plan to run your EAs on more accounts simultaneously.</p>
              </div>
            </div>
            <Link href="/pricing" className="btn-outline-gold py-2 px-6 text-xs whitespace-nowrap">
              Upgrade Plan
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
