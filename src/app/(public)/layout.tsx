import Navbar from "@/components/landing/Navbar";
import Link from "next/link";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <footer className="border-t border-elite-border py-20 bg-black">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="space-y-4">
            <h3 className="text-xl font-bold gold-text">ELITE EA</h3>
            <p className="text-gray-500 text-sm max-w-xs mx-auto md:mx-0">Institutional grade trading algorithms for the modern investor.</p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400">Contact Support</h4>
            <p className="text-white font-bold">+254 726 090 372</p>
            <p className="text-gray-500 text-sm">support@elite-ea.com</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400">Quick Links</h4>
            <div className="flex flex-col space-y-2 text-sm text-gray-500">
              <Link href="/bots" className="hover:text-elite-gold transition-colors">EA Bots</Link>
              <Link href="/pricing" className="hover:text-elite-gold transition-colors">Pricing Plans</Link>
              <Link href="/performance" className="hover:text-elite-gold transition-colors">Verified Results</Link>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-6 pt-12 mt-12 border-t border-white/5 text-center">
          <p className="text-gray-600 text-[10px] uppercase tracking-widest mb-4">
            © 2026 Elite EA Marketplace. All rights reserved.
          </p>
          <p className="text-gray-700 text-[10px] max-w-3xl mx-auto leading-relaxed">
            Risk Warning: Trading Foreign Exchange (Forex) and Contracts for Differences (CFDs) is highly speculative, carries a high level of risk and may not be suitable for all investors. You may sustain a loss of some or all of your invested capital, therefore, you should not speculate with capital that you cannot afford to lose.
          </p>
        </div>
      </footer>
    </>
  );
}
