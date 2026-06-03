"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EAProduct } from "@/lib/mockData";
import { TrendingUp, Activity, ArrowRight } from "lucide-react";

interface BotCardProps {
  bot: EAProduct;
}

const BotCard = ({ bot }: BotCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="glass-card flex flex-col overflow-hidden h-full group"
    >
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-elite-gold/10 text-elite-gold px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-elite-gold/20">
            {bot.risk_level} Risk
          </div>
          <div className="flex items-center text-green-500 text-xs font-bold">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            LIVE
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-2 group-hover:text-elite-gold transition-colors">
          {bot.name}
        </h3>
        <p className="text-gray-400 text-sm mb-6 line-clamp-2">
          {bot.short_description}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/5 p-3 rounded-lg border border-elite-border">
            <div className="flex items-center text-gray-500 text-[10px] uppercase mb-1">
              <TrendingUp size={12} className="mr-1" />
              Win Rate
            </div>
            <p className="text-lg font-bold">{bot.win_rate}%</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg border border-elite-border">
            <div className="flex items-center text-gray-500 text-[10px] uppercase mb-1">
              <Activity size={12} className="mr-1" />
              Drawdown
            </div>
            <p className="text-lg font-bold text-red-400">{bot.drawdown}%</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {bot.pairs.slice(0, 3).map((pair) => (
            <span key={pair} className="bg-elite-surface px-2 py-1 rounded border border-elite-border text-[10px] text-gray-400 font-mono">
              {pair}
            </span>
          ))}
        </div>
      </div>

      <div className="p-6 bg-white/5 border-t border-elite-border flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500 uppercase">Starting at</p>
          <p className="text-xl font-bold text-elite-gold">${bot.price_monthly}<span className="text-xs text-gray-400 font-normal">/mo</span></p>
        </div>
        <Link 
          href={`/bots/${bot.slug}`} 
          className="bg-elite-gold p-3 rounded-full text-black hover:bg-elite-gold-light transition-colors"
        >
          <ArrowRight size={20} />
        </Link>
      </div>
    </motion.div>
  );
};

export default BotCard;
