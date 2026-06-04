"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function FloatingWhatsApp() {
  return (
    <motion.div 
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring" }}
      className="fixed bottom-8 right-8 z-50"
    >
      <Link 
        href="https://wa.me/254726090372?text=Hello%20Elite%20EA%20Team,%20I%20have%20a%20question." 
        target="_blank"
        className="relative group flex items-center"
      >
        <div className="absolute right-full mr-4 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat with us on WhatsApp
        </div>
        <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] transition-all hover:scale-110 active:scale-95">
          <svg className="w-8 h-8 fill-white" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.319 1.592 5.548 0 10.058-4.51 10.061-10.062 0-2.69-1.047-5.216-2.947-7.117-1.9-1.901-4.424-2.947-7.113-2.947-5.552 0-10.061 4.51-10.064 10.063 0 2.13.57 4.218 1.648 5.922l-1.077 3.931 4.193-1.082zm11.336-7.31c-.305-.152-1.802-.888-2.081-.99-.278-.101-.48-.152-.682.152-.202.304-.783 1.013-.96 1.216-.177.203-.354.228-.659.076-.305-.152-1.287-.474-2.451-1.511-.906-.808-1.517-1.806-1.695-2.11-.177-.304-.019-.468.133-.619.136-.136.305-.355.457-.532.152-.177.202-.304.304-.507.101-.202.051-.38-.025-.532-.076-.152-.682-1.646-.935-2.254-.247-.591-.498-.51-.682-.519-.177-.009-.38-.011-.582-.011-.203 0-.532.076-.81.38-.278.304-1.063 1.039-1.063 2.532s1.089 2.938 1.241 3.141c.152.202 2.144 3.273 5.193 4.589.725.312 1.291.499 1.731.638.728.23 1.391.197 1.915.119.584-.087 1.802-.736 2.055-1.445.253-.709.253-1.317.177-1.445-.076-.127-.278-.203-.582-.355z"/>
          </svg>
        </div>
      </Link>
    </motion.div>
  );
}
