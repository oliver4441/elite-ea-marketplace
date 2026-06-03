"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TrendingUp, ShieldCheck, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-elite-gold/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-elite-gold/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center space-x-2 bg-elite-surface/50 border border-elite-border px-4 py-2 rounded-full mb-6">
            <ShieldCheck className="text-elite-gold" size={18} />
            <span className="text-sm text-gray-300 font-medium">Verified Performance & Secure Licensing</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Automate Your <br />
            <span className="gold-text">Trading Success</span>
          </h1>

          <p className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed">
            Harness the power of institutional-grade Forex Expert Advisors. 
            Precision-engineered algorithms for consistent returns in any market condition.
          </p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href="/bots" className="btn-gold flex items-center justify-center space-x-2">
              <span>View All Bots</span>
              <Zap size={20} />
            </Link>
            <Link href="/performance" className="btn-outline-gold flex items-center justify-center space-x-2">
              <span>View Performance</span>
              <TrendingUp size={20} />
            </Link>
          </div>

          <div className="mt-12 flex items-center space-x-8">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">94%</span>
              <span className="text-sm text-gray-500 uppercase tracking-wider">Avg Win Rate</span>
            </div>
            <div className="h-10 w-px bg-elite-border" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">5k+</span>
              <span className="text-sm text-gray-500 uppercase tracking-wider">Active Users</span>
            </div>
            <div className="h-10 w-px bg-elite-border" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">$12M+</span>
              <span className="text-sm text-gray-500 uppercase tracking-wider">Traded Monthly</span>
            </div>
          </div>
        </motion.div>

        {/* Visual Element / Animated Chart Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden md:block"
        >
          <div className="glass-card p-8 border-elite-gold/30 shadow-[0_0_50px_rgba(212,175,55,0.1)]">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-elite-border">
                  <TrendingUp className="text-elite-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Elite Scalper v7</h3>
                  <p className="text-xs text-green-500 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                    Live Trading
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">+12.4%</p>
                <p className="text-xs text-gray-400">Monthly Return</p>
              </div>
            </div>

            {/* Simple CSS Chart Mockup */}
            <div className="h-48 flex items-end space-x-2">
              {[40, 60, 45, 70, 55, 85, 65, 95, 80, 100].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className="flex-1 bg-gold-gradient rounded-t-sm opacity-80 hover:opacity-100 transition-opacity"
                />
              ))}
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-3 rounded-lg border border-elite-border">
                <p className="text-xs text-gray-500 uppercase tracking-tighter">Win Rate</p>
                <p className="text-lg font-bold text-elite-gold">87.5%</p>
              </div>
              <div className="bg-white/5 p-3 rounded-lg border border-elite-border">
                <p className="text-xs text-gray-500 uppercase tracking-tighter">Profit Factor</p>
                <p className="text-lg font-bold text-elite-gold">2.41</p>
              </div>
            </div>
          </div>
          
          {/* Floating Accents */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-gold-gradient rounded-full blur-[60px] opacity-20" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-elite-gold rounded-full blur-[80px] opacity-10" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
