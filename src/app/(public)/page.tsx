import Hero from "@/components/landing/Hero";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      
      {/* Feature Section Placeholder */}
      <section className="py-24 bg-elite-surface/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose <span className="gold-text">Elite EA</span>?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our marketplace provides only the highest quality trading algorithms, 
              rigorously tested and verified for long-term profitability.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Verified Results", desc: "Every EA is backed by live MyFXBook or MetaAPI verified trading history." },
              { title: "Secure Licensing", desc: "Automated license management ensures you stay protected and up-to-date." },
              { title: "Premium Support", desc: "Access 24/7 dedicated support via Telegram, WhatsApp, and Email." },
            ].map((feature, i) => (
              <div key={i} className="glass-card p-8 hover:border-elite-gold/50 transition-colors">
                <h3 className="text-xl font-bold mb-4 text-elite-gold">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
