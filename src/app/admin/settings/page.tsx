"use client";

import { useState } from "react";
import AdminSidebar from "@/components/dashboard/AdminSidebar";
import { 
  Save, 
  Globe, 
  CreditCard, 
  Mail, 
  Key,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function AdminSettingsPage() {
  const [siteName, setSiteName] = useState("Elite EA Marketplace");
  const [siteDescription, setSiteDescription] = useState("Premium Forex Expert Advisors for institutional-grade trading.");
  const [mpesaEnabled, setMpesaEnabled] = useState(true);
  const [paystackEnabled, setPaystackEnabled] = useState(false);
  const [emailProvider, setEmailProvider] = useState("smtp");
  const [licenseExpiry, setLicenseExpiry] = useState("365");
  const [maxActivations, setMaxActivations] = useState("3");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      <AdminSidebar />

      <div className="flex-1 lg:ml-64 flex flex-col">
        <header className="h-20 border-b border-elite-border flex items-center justify-between px-8 bg-black/50 backdrop-blur-xl sticky top-0 z-40">
          <h1 className="text-xl font-bold">Admin <span className="gold-text">Settings</span></h1>
        </header>

        <main className="p-8 space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Platform <span className="gold-text">Settings</span></h2>
            <p className="text-gray-500 text-sm">Configure your marketplace, payments, email, and licensing.</p>
          </div>

          {saved && (
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center space-x-3 text-green-500 animate-fade-in">
              <CheckCircle2 size={20} />
              <p className="text-sm font-medium">Settings saved successfully!</p>
            </div>
          )}

          {/* General Settings */}
          <div className="glass-card p-8 space-y-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-elite-gold/10 rounded-lg">
                <Globe className="text-elite-gold" size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold">General Settings</h3>
                <p className="text-xs text-gray-500">Basic marketplace configuration</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Site Name</label>
                <input 
                  type="text" 
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="w-full bg-black/40 border border-elite-border rounded-lg px-4 py-3 outline-none focus:border-elite-gold transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Site Description</label>
                <textarea 
                  rows={3}
                  value={siteDescription}
                  onChange={(e) => setSiteDescription(e.target.value)}
                  className="w-full bg-black/40 border border-elite-border rounded-lg px-4 py-3 outline-none focus:border-elite-gold transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* Payment Settings */}
          <div className="glass-card p-8 space-y-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-elite-gold/10 rounded-lg">
                <CreditCard className="text-elite-gold" size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Payment Settings</h3>
                <p className="text-xs text-gray-500">Configure payment gateways</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* M-Pesa */}
              <div className="flex items-center justify-between p-4 bg-white/[0.02] rounded-lg border border-elite-border/50">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${mpesaEnabled ? 'bg-green-500' : 'bg-gray-600'}`} />
                  <div>
                    <p className="font-bold">M-Pesa (Daraja API)</p>
                    <p className="text-xs text-gray-500">Mobile money payments for East African customers</p>
                  </div>
                </div>
                <button 
                  onClick={() => setMpesaEnabled(!mpesaEnabled)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    mpesaEnabled 
                      ? 'bg-green-500/10 border border-green-500/20 text-green-500' 
                      : 'bg-white/5 border border-elite-border text-gray-500'
                  }`}
                >
                  {mpesaEnabled ? 'Configured' : 'Not Configured'}
                </button>
              </div>

              {/* Paystack */}
              <div className="flex items-center justify-between p-4 bg-white/[0.02] rounded-lg border border-elite-border/50">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${paystackEnabled ? 'bg-green-500' : 'bg-gray-600'}`} />
                  <div>
                    <p className="font-bold">Paystack</p>
                    <p className="text-xs text-gray-500">Card and bank transfer payments for global customers</p>
                  </div>
                </div>
                <button 
                  onClick={() => setPaystackEnabled(!paystackEnabled)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    paystackEnabled 
                      ? 'bg-green-500/10 border border-green-500/20 text-green-500' 
                      : 'bg-white/5 border border-elite-border text-gray-500'
                  }`}
                >
                  {paystackEnabled ? 'Configured' : 'Not Configured'}
                </button>
              </div>
            </div>
          </div>

          {/* Email Settings */}
          <div className="glass-card p-8 space-y-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-elite-gold/10 rounded-lg">
                <Mail className="text-elite-gold" size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Email Settings</h3>
                <p className="text-xs text-gray-500">Configure email delivery provider</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email Provider</label>
                <select 
                  value={emailProvider}
                  onChange={(e) => setEmailProvider(e.target.value)}
                  className="w-full bg-black/40 border border-elite-border rounded-lg px-4 py-3 outline-none focus:border-elite-gold transition-all appearance-none cursor-pointer"
                >
                  <option value="smtp">SMTP (Gmail, SendGrid, etc.)</option>
                  <option value="sendgrid">SendGrid API</option>
                  <option value="resend">Resend API</option>
                  <option value="mailgun">Mailgun</option>
                </select>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
                <AlertCircle className="text-yellow-500 mt-0.5 shrink-0" size={16} />
                <p className="text-xs text-yellow-500/80">
                  Email configuration requires server-side environment variables. Update your .env file with the correct credentials.
                </p>
              </div>
            </div>
          </div>

          {/* License Settings */}
          <div className="glass-card p-8 space-y-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-elite-gold/10 rounded-lg">
                <Key className="text-elite-gold" size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold">License Settings</h3>
                <p className="text-xs text-gray-500">Default licensing rules for new products</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Default License Expiry (days)</label>
                <input 
                  type="number" 
                  value={licenseExpiry}
                  onChange={(e) => setLicenseExpiry(e.target.value)}
                  className="w-full bg-black/40 border border-elite-border rounded-lg px-4 py-3 outline-none focus:border-elite-gold transition-all"
                />
                <p className="text-[10px] text-gray-600 mt-1">Set to 0 for lifetime licenses</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Max Activations per License</label>
                <input 
                  type="number" 
                  value={maxActivations}
                  onChange={(e) => setMaxActivations(e.target.value)}
                  className="w-full bg-black/40 border border-elite-border rounded-lg px-4 py-3 outline-none focus:border-elite-gold transition-all"
                />
                <p className="text-[10px] text-gray-600 mt-1">Number of machines per license</p>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button 
              onClick={handleSave}
              className="btn-gold py-3 px-8 flex items-center space-x-2 text-sm"
            >
              <Save size={18} />
              <span>Save All Settings</span>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
