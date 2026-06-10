import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug, getProducts } from "@/lib/supabase/products";
import PerformanceChart from "@/components/charts/PerformanceChart";
import { CheckCircle2, TrendingUp, Activity, Shield, Download, Zap, ArrowLeft, Star } from "lucide-react";
import BuyButton from "@/components/marketplace/BuyButton";
import BotCard from "@/components/marketplace/BotCard";
import { EAProduct } from "@/lib/mockData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const MOCK_REVIEWS = [
  {
    id: "1",
    name: "James M.",
    rating: 5,
    date: "2026-05-15",
    comment: "Incredible results from day one. The scalper is precise and the support team helped me set up within minutes.",
  },
  {
    id: "2",
    name: "Sarah K.",
    rating: 4,
    date: "2026-05-10",
    comment: "Solid performance over the last month. Drawdown is well within the advertised range. Highly recommend for beginners.",
  },
  {
    id: "3",
    name: "Michael T.",
    rating: 5,
    date: "2026-04-28",
    comment: "Best EA I've used so far. The profit factor is real — I've been running it on two accounts with consistent gains.",
  },
  {
    id: "4",
    name: "David L.",
    rating: 4,
    date: "2026-04-20",
    comment: "Good bot overall. Took a while to optimize settings for my broker but once dialed in, it performs great.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={star <= rating ? "text-elite-gold fill-elite-gold" : "text-gray-600"}
        />
      ))}
    </div>
  );
}

export default async function BotDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const bot = await getProductBySlug(slug);

  if (!bot) {
    notFound();
  }

  // Get related bots (exclude current)
  const allProducts = await getProducts();
  const relatedBots = allProducts.filter((p) => p.slug !== slug).slice(0, 3);

  const avgRating = MOCK_REVIEWS.reduce((sum, r) => sum + r.rating, 0) / MOCK_REVIEWS.length;

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        {/* Back Link */}
        <Link
          href="/bots"
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-elite-gold transition-colors mb-8 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Bots</span>
        </Link>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-elite-gold/10 border border-elite-gold/20 px-4 py-1 rounded-full mb-4">
              <Shield className="text-elite-gold" size={14} />
              <span className="text-xs text-elite-gold font-bold uppercase tracking-wider">Verified Performance</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{bot.name}</h1>
            <p className="text-xl text-gray-400 leading-relaxed">{bot.short_description}</p>
          </div>

          <div className="glass-card p-6 min-w-[300px] border-elite-gold/30">
            <p className="text-sm text-gray-500 uppercase mb-2">Lifetime License</p>
            <p className="text-4xl font-bold mb-6">${bot.price_lifetime}</p>
            <BuyButton
              productId={bot.id}
              productName={bot.name}
              priceUSD={Number(bot.price_lifetime)}
              priceType="lifetime"
            />
            <Link
              href={`https://wa.me/254726090372?text=Hello%20Elite%20EA%20Team,%20I'm%20interested%20in%20learning%20more%20about%20${encodeURIComponent(bot.name)}.`}
              target="_blank"
              className="w-full py-3 rounded-full border border-green-500/30 text-green-500 font-bold text-center hover:bg-green-500/5 transition-all flex items-center justify-center space-x-2 text-sm mb-4"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.319 1.592 5.548 0 10.058-4.51 10.061-10.062 0-2.69-1.047-5.216-2.947-7.117-1.9-1.901-4.424-2.947-7.113-2.947-5.552 0-10.061 4.51-10.064 10.063 0 2.13.57 4.218 1.648 5.922l-1.077 3.931 4.193-1.082zm11.336-7.31c-.305-.152-1.802-.888-2.081-.99-.278-.101-.48-.152-.682.152-.202.304-.783 1.013-.96 1.216-.177.203-.354.228-.659.076-.305-.152-1.287-.474-2.451-1.511-.906-.808-1.517-1.806-1.695-2.11-.177-.304-.019-.468.133-.619.136-.136.305-.355.457-.532.152-.177.202-.304.304-.507.101-.202.051-.38-.025-.532-.076-.152-.682-1.646-.935-2.254-.247-.591-.498-.51-.682-.519-.177-.009-.38-.011-.582-.011-.203 0-.532.076-.81.38-.278.304-1.063 1.039-1.063 2.532s1.089 2.938 1.241 3.141c.152.202 2.144 3.273 5.193 4.589.725.312 1.291.499 1.731.638.728.23 1.391.197 1.915.119.584-.087 1.802-.736 2.055-1.445.253-.709.253-1.317.177-1.445-.076-.127-.278-.203-.582-.355z"/>
              </svg>
              <span>Inquiry via WhatsApp</span>
            </Link>
            <p className="text-center text-xs text-gray-500">Includes 1 year of updates & support</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Win Rate", value: `${bot.win_rate}%`, icon: TrendingUp },
            { label: "Profit Factor", value: bot.profit_factor, icon: Zap },
            { label: "Max Drawdown", value: `${bot.drawdown}%`, icon: Activity },
            { label: "Risk Level", value: bot.risk_level, icon: Shield },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-6 flex flex-col items-center text-center">
              <stat.icon className="text-elite-gold mb-4" size={24} />
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Performance Chart & Details */}
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <PerformanceChart />

            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-6">Technical Strategy</h2>
              <p className="text-gray-400 leading-relaxed mb-6">{bot.description}</p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold mb-4 text-elite-gold">Supported Pairs</h3>
                  <div className="flex flex-wrap gap-2">
                    {bot.pairs.map((p) => (
                      <span key={p} className="bg-white/5 border border-elite-border px-3 py-1 rounded-md text-sm font-mono">{p}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-4 text-elite-gold">Timeframes</h3>
                  <div className="flex flex-wrap gap-2">
                    {bot.timeframes.map((t) => (
                      <span key={t} className="bg-white/5 border border-elite-border px-3 py-1 rounded-md text-sm font-mono">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="glass-card p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Customer Reviews</h2>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Star className="text-elite-gold fill-elite-gold" size={20} />
                    <span className="text-xl font-bold">{avgRating.toFixed(1)}</span>
                  </div>
                  <span className="text-sm text-gray-500">({MOCK_REVIEWS.length} reviews)</span>
                </div>
              </div>

              <div className="space-y-6">
                {MOCK_REVIEWS.map((review) => (
                  <div key={review.id} className="border-b border-elite-border/30 pb-6 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-elite-gold/10 rounded-full flex items-center justify-center text-elite-gold font-bold text-sm">
                          {review.name.charAt(0)}
                        </div>
                        <span className="font-bold text-sm">{review.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                    </div>
                    <div className="mb-2">
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold mb-6">What&apos;s Included?</h3>
              <ul className="space-y-4">
                {[
                  "EA File (.ex4 / .ex5)",
                  "PDF Installation Guide",
                  "Optimized Set Files",
                  "Video Documentation",
                  "Dedicated VPS Support",
                  "Lifetime Updates",
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3 text-sm text-gray-300">
                    <CheckCircle2 className="text-elite-gold flex-shrink-0" size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button className="btn-outline-gold w-full mt-8 flex items-center justify-center space-x-2">
                <Download size={18} />
                <span>Download PDF Guide</span>
              </button>
            </div>

            <div className="glass-card p-8 bg-elite-gold/5 border-elite-gold/20">
              <h3 className="text-xl font-bold mb-4">Limited Offer!</h3>
              <p className="text-sm text-gray-400 mb-6">
                Get <span className="text-white font-bold">20% OFF</span> on your first purchase using the code: <span className="text-elite-gold font-mono font-bold">ELITE20</span>
              </p>
              <div className="bg-black/40 border border-dashed border-elite-gold/40 p-3 rounded text-center text-xs font-mono uppercase tracking-widest text-elite-gold">
                ELITE20
              </div>
            </div>
          </div>
        </div>

        {/* Related Bots */}
        {relatedBots.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-8">Related <span className="gold-text">Bots</span></h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedBots.map((relatedBot) => (
                <BotCard key={relatedBot.id} bot={relatedBot} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
