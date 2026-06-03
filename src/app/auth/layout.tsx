"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-elite-gold/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-elite-gold/10 rounded-full blur-[100px] -z-10 animate-pulse" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gold-gradient rounded-xl flex items-center justify-center font-bold text-black text-2xl shadow-lg shadow-elite-gold/20">
              E
            </div>
            <span className="text-3xl font-bold gold-text">ELITE EA</span>
          </Link>
          <div className="inline-flex items-center space-x-2 bg-elite-surface/50 border border-elite-border px-4 py-1.5 rounded-full">
            <ShieldCheck className="text-elite-gold" size={16} />
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Secure Access</span>
          </div>
        </div>

        <div className="glass-card p-8 relative overflow-hidden">
          {/* Subtle decorative elements */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-elite-gold/5 rounded-full blur-2xl -mr-12 -mt-12" />
          {children}
        </div>

        <p className="mt-8 text-center text-gray-500 text-sm">
          © 2026 Elite EA Marketplace. Secure & Encrypted.
        </p>
      </motion.div>
    </div>
  );
}
