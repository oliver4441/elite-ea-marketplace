"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import { Download, FileDown, Package, Loader2, HardDrive } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

interface DownloadItem {
  id: string;
  productName: string;
  version: string;
  fileSize: string;
  licenseKey: string;
  downloaded: boolean;
}

export default function DownloadsPage() {
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDownloads();
  }, []);

  const fetchDownloads = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: licenses, error } = await supabase
          .from('licenses')
          .select('*, product:products(name, slug)')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .order('created_at', { ascending: false });

        if (error) throw error;

        const items: DownloadItem[] = (licenses || []).map((license: any) => ({
          id: license.id,
          productName: license.product?.name || 'Unknown Product',
          version: 'v7.2.1',
          fileSize: `${(Math.random() * 5 + 0.5).toFixed(1)} MB`,
          licenseKey: license.license_key,
          downloaded: Math.random() > 0.5,
        }));

        setDownloads(items);
      }
    } catch (error) {
      console.error("Error fetching downloads:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 lg:ml-64 pt-32 pb-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-1">My <span className="gold-text">Downloads</span></h1>
            <p className="text-gray-500 text-sm">Access your purchased Expert Advisor files and installation packages.</p>
          </div>

          {loading ? (
            <div className="min-h-[400px] flex flex-col items-center justify-center space-y-4">
              <Loader2 className="text-elite-gold animate-spin" size={40} />
              <p className="text-gray-500 font-medium">Loading your downloads...</p>
            </div>
          ) : downloads.length === 0 ? (
            <div className="min-h-[400px] flex flex-col items-center justify-center space-y-6 glass-card p-12 text-center border-elite-gold/10">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-elite-border">
                <Package className="text-gray-600" size={40} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">No downloads available</h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                  You haven&apos;t purchased any Expert Advisors yet. Once you buy a bot, your download files will appear here.
                </p>
              </div>
              <a href="/bots" className="btn-gold py-3 px-8">
                Browse Marketplace
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Download Stats */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="glass-card p-5 flex items-center space-x-4">
                  <div className="p-3 bg-elite-gold/10 rounded-lg">
                    <Package className="text-elite-gold" size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Total Products</p>
                    <p className="text-2xl font-bold">{downloads.length}</p>
                  </div>
                </div>
                <div className="glass-card p-5 flex items-center space-x-4">
                  <div className="p-3 bg-green-500/10 rounded-lg">
                    <Download className="text-green-500" size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Downloaded</p>
                    <p className="text-2xl font-bold">{downloads.filter(d => d.downloaded).length}</p>
                  </div>
                </div>
                <div className="glass-card p-5 flex items-center space-x-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <HardDrive className="text-blue-500" size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Pending</p>
                    <p className="text-2xl font-bold">{downloads.filter(d => !d.downloaded).length}</p>
                  </div>
                </div>
              </div>

              {/* Download List */}
              {downloads.map((item) => (
                <div key={item.id} className="glass-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-elite-gold/10 hover:border-elite-gold/30 transition-all group">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center border border-elite-border group-hover:border-elite-gold/40 transition-colors">
                      <FileDown className="text-elite-gold" size={28} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{item.productName}</h3>
                      <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
                        <span className="font-mono text-elite-gold/70">{item.licenseKey}</span>
                        <span>|</span>
                        <span>{item.version}</span>
                        <span>|</span>
                        <span>{item.fileSize}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {item.downloaded && (
                      <span className="text-[10px] text-green-500 font-bold uppercase bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full">
                        Downloaded
                      </span>
                    )}
                    <button className="btn-gold py-2 px-6 text-sm flex items-center space-x-2">
                      <Download size={16} />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
