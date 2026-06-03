"use client";

import AdminSidebar from "@/components/dashboard/AdminSidebar";
import { ShieldAlert, Bell, Search, User } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <AdminSidebar />
      
      <div className="flex-1 lg:ml-64 flex flex-col">
        {/* Top Header */}
        <header className="h-20 border-b border-elite-border flex items-center justify-between px-8 bg-black/50 backdrop-blur-xl sticky top-0 z-40">
          <div className="flex items-center space-x-4">
            <div className="inline-flex items-center space-x-2 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full">
              <ShieldAlert className="text-red-500" size={14} />
              <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider">Admin Mode</span>
            </div>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input 
                type="text" 
                placeholder="Quick search..." 
                className="bg-white/5 border border-elite-border rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-elite-gold transition-colors w-64"
              />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button className="relative text-gray-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-elite-gold rounded-full" />
            </button>
            
            <div className="flex items-center space-x-3 pl-6 border-l border-elite-border">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold">Admin User</p>
                <p className="text-[10px] text-elite-gold uppercase tracking-widest font-medium">Super Admin</p>
              </div>
              <div className="w-10 h-10 bg-white/5 border border-elite-border rounded-full flex items-center justify-center text-elite-gold">
                <User size={20} />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
