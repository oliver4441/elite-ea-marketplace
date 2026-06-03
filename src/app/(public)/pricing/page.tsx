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
      cta: "Contact Sales",
      popular: false,
    },
  ];

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
                href="/login" 
                className={`w-full py-4 rounded-full font-bold text-center transition-all flex items-center justify-center space-x-2 ${
                  plan.popular 
                  ? "bg-gold-gradient text-black hover:scale-105" 
                  : "bg-white/5 text-white hover:bg-white/10 border border-elite-border"
                }`}
              >
                <span>{plan.cta}</span>
                {plan.popular && <Zap size={18} />}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-gray-500 text-sm mb-4">Need a custom plan? <Link href="/contact" className="text-elite-gold hover:underline">Talk to our team</Link></p>
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
