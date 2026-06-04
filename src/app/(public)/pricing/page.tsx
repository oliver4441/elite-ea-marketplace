import { Check, Zap } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const plans = [
    {
      name: "Monthly",
      price: "49",
      description: "Perfect for testing our strategies on a live account.",
      features: [
        "1 Live Account License",
        "Unlimited Demo Accounts",
        "All Technical Indicators",
        "Community Support",
        "Weekly Updates",
      ],
      cta: "Start Monthly",
      popular: false,
    },
    {
      name: "Lifetime",
      price: "499",
      description: "Our most popular plan for serious long-term traders.",
      features: [
        "3 Live Account Licenses",
        "Unlimited Demo Accounts",
        "Priority MetaAPI Setup",
        "Exclusive Strategy Set Files",
        "24/7 VIP Support",
        "Lifetime Free Updates",
        "Private Alpha Group Access",
      ],
      cta: "Get Lifetime Access",
      popular: true,
    },
    {
      name: "Institutional",
      price: "1,999",
      description: "Custom solutions for prop firms and hedge funds.",
      features: [
        "Unlimited Live Licenses",
        "Custom Algorithm Tuning",
        "White-label Options",
        "On-premise Deployment",
        "Dedicated Account Manager",
        "Custom API Integration",
      ],
      cta: "Chat on WhatsApp",
      popular: false,
      whatsapp: true,
    },
  ];

  const whatsappUrl = "https://wa.me/254726090372?text=Hello%20Elite%20EA%20Team,%20I'm%20interested%20in%20the%20Institutional%20Plan.";

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Simple, <span className="gold-text">Transparent</span> Pricing
          </h1>
          <p className="text-xl text-gray-400">
            Choose the plan that fits your trading style. All plans include our 
            core algorithm updates and basic support.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`glass-card p-8 flex flex-col relative ${
                plan.popular ? "border-elite-gold shadow-[0_0_30px_rgba(212,175,55,0.15)] scale-105 z-10" : "border-elite-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold-gradient text-black text-xs font-black px-4 py-1 rounded-full uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-500 text-sm h-10">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-gray-400 text-2xl">$</span>
                  <span className="text-5xl font-bold">{plan.price}</span>
                  {plan.name === "Monthly" && <span className="text-gray-500 ml-2">/mo</span>}
                </div>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start space-x-3 text-sm text-gray-300">
                    <Check className="text-elite-gold mt-0.5 flex-shrink-0" size={16} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link 
                href={plan.whatsapp ? whatsappUrl : "/login"}
                target={plan.whatsapp ? "_blank" : "_self"}
                className={`w-full py-4 rounded-full font-bold text-center transition-all flex items-center justify-center space-x-2 ${
                  plan.popular 
                  ? "bg-gold-gradient text-black hover:scale-105" 
                  : plan.whatsapp
                  ? "bg-green-600 text-white hover:bg-green-700 border border-green-500/30"
                  : "bg-white/5 text-white hover:bg-white/10 border border-elite-border"
                }`}
              >
                <span>{plan.cta}</span>
                {plan.popular && <Zap size={18} />}
                {plan.whatsapp && (
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.319 1.592 5.548 0 10.058-4.51 10.061-10.062 0-2.69-1.047-5.216-2.947-7.117-1.9-1.901-4.424-2.947-7.113-2.947-5.552 0-10.061 4.51-10.064 10.063 0 2.13.57 4.218 1.648 5.922l-1.077 3.931 4.193-1.082zm11.336-7.31c-.305-.152-1.802-.888-2.081-.99-.278-.101-.48-.152-.682.152-.202.304-.783 1.013-.96 1.216-.177.203-.354.228-.659.076-.305-.152-1.287-.474-2.451-1.511-.906-.808-1.517-1.806-1.695-2.11-.177-.304-.019-.468.133-.619.136-.136.305-.355.457-.532.152-.177.202-.304.304-.507.101-.202.051-.38-.025-.532-.076-.152-.682-1.646-.935-2.254-.247-.591-.498-.51-.682-.519-.177-.009-.38-.011-.582-.011-.203 0-.532.076-.81.38-.278.304-1.063 1.039-1.063 2.532s1.089 2.938 1.241 3.141c.152.202 2.144 3.273 5.193 4.589.725.312 1.291.499 1.731.638.728.23 1.391.197 1.915.119.584-.087 1.802-.736 2.055-1.445.253-.709.253-1.317.177-1.445-.076-.127-.278-.203-.582-.355z"/>
                  </svg>
                )}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-20 glass-card p-10 flex flex-col md:flex-row items-center justify-between gap-8 border-elite-gold/20">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-2xl font-bold mb-4">Pay with <span className="text-green-500">M-Pesa</span>?</h2>
            <p className="text-gray-400">For our clients in Kenya, we support direct M-Pesa payments. Chat with us to get the payment details and instant activation.</p>
          </div>
          <Link 
            href="https://wa.me/254726090372?text=Hello%20Elite%20EA%20Team,%20I'd%20like%20to%20pay%20via%20M-Pesa." 
            target="_blank"
            className="flex items-center space-x-3 bg-green-600/10 border border-green-500/20 px-8 py-4 rounded-full hover:bg-green-600/20 transition-all group"
          >
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform font-bold">
              M
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-500 uppercase font-bold text-green-500">Pay via</p>
              <p className="text-lg font-bold">M-Pesa Inquiries</p>
            </div>
          </Link>
        </div>

        <div className="mt-12 glass-card p-10 flex flex-col md:flex-row items-center justify-between gap-8 border-elite-gold/20">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-2xl font-bold mb-4">Have questions before joining?</h2>
            <p className="text-gray-400">Our support team is available 24/7 to help you choose the right strategy for your capital and risk profile.</p>
          </div>
          <Link 
            href="https://wa.me/254726090372" 
            target="_blank"
            className="flex items-center space-x-3 bg-white/5 border border-elite-border px-8 py-4 rounded-full hover:bg-white/10 transition-all group"
          >
            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.319 1.592 5.548 0 10.058-4.51 10.061-10.062 0-2.69-1.047-5.216-2.947-7.117-1.9-1.901-4.424-2.947-7.113-2.947-5.552 0-10.061 4.51-10.064 10.063 0 2.13.57 4.218 1.648 5.922l-1.077 3.931 4.193-1.082zm11.336-7.31c-.305-.152-1.802-.888-2.081-.99-.278-.101-.48-.152-.682.152-.202.304-.783 1.013-.96 1.216-.177.203-.354.228-.659.076-.305-.152-1.287-.474-2.451-1.511-.906-.808-1.517-1.806-1.695-2.11-.177-.304-.019-.468.133-.619.136-.136.305-.355.457-.532.152-.177.202-.304.304-.507.101-.202.051-.38-.025-.532-.076-.152-.682-1.646-.935-2.254-.247-.591-.498-.51-.682-.519-.177-.009-.38-.011-.582-.011-.203 0-.532.076-.81.38-.278.304-1.063 1.039-1.063 2.532s1.089 2.938 1.241 3.141c.152.202 2.144 3.273 5.193 4.589.725.312 1.291.499 1.731.638.728.23 1.391.197 1.915.119.584-.087 1.802-.736 2.055-1.445.253-.709.253-1.317.177-1.445-.076-.127-.278-.203-.582-.355z"/>
              </svg>
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-500 uppercase font-bold">Contact us via</p>
              <p className="text-lg font-bold">WhatsApp Support</p>
            </div>
          </Link>
        </div>

        <div className="mt-20 text-center">
          <p className="text-gray-500 text-sm mb-4">Payment Methods</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-40">
            {/* Payment Method Logos Placeholder */}
            {["Stripe", "PayPal", "Bitcoin", "Ethereum", "M-Pesa"].map((m) => (
              <span key={m} className="font-bold text-lg">{m}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
