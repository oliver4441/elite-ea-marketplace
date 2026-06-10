"use client";

import { useState } from "react";
import { X, Zap, Smartphone, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface PaymentModalProps {
  productId: string;
  productName: string;
  priceUSD: number;
  priceType: "lifetime" | "monthly";
  onClose: () => void;
}

export default function PaymentModal({ 
  productId, 
  productName, 
  priceUSD, 
  priceType, 
  onClose 
}: PaymentModalProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleMpesaCheckout = async () => {
    if (!phoneNumber || !/^254(7|1)\d{8}$/.test(phoneNumber)) {
      toast.error("Please enter a valid M-Pesa number (2547XXXXXXXX).");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/payments/mpesa/stk-push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, priceType, phoneNumber }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("STK Push sent to your phone. Please enter your PIN.");
        // We could poll for status here, but for now redirect to dashboard
        setTimeout(() => {
          router.push("/dashboard?waiting_payment=true");
        }, 3000);
      } else {
        toast.error(data.error || "Failed to initiate M-Pesa payment.");
      }
    } catch (error) {
      console.error("M-Pesa error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-elite-surface border border-elite-border rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-elite-border flex items-center justify-between">
          <h2 className="text-xl font-bold">Checkout</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Product Info */}
          <div className="bg-white/5 rounded-xl p-4 border border-elite-border">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Product</p>
            <p className="font-bold text-lg">{productName}</p>
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-gray-400 capitalize">{priceType} License</p>
              <p className="text-xl font-bold text-elite-gold">${priceUSD}</p>
            </div>
          </div>

          {/* Payment Method - M-Pesa Only */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-[#10B981] bg-[#10B981]/10 p-3 rounded-lg border border-[#10B981]/30">
              <Smartphone size={20} />
              <span className="text-sm font-bold uppercase">M-Pesa STK Push</span>
            </div>
            
            <div className="space-y-3">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                M-Pesa Number
              </label>
              <input 
                type="text"
                placeholder="2547XXXXXXXX"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full bg-black/40 border border-elite-border rounded-lg px-4 py-3 outline-none focus:border-[#10B981] transition-all font-mono"
              />
              <p className="text-[10px] text-gray-500 leading-relaxed italic">
                * Approx. KES {(priceUSD * 130).toLocaleString()} will be charged at current rates.
              </p>
            </div>
          </div>

          <button 
            disabled={loading}
            onClick={handleMpesaCheckout}
            className="w-full py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all transform active:scale-95 bg-[#10B981] hover:bg-[#059669] text-white disabled:opacity-50 disabled:active:scale-100"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <span>Initiate M-Pesa Payment</span>
                <Zap size={18} />
              </>
            )}
          </button>
        </div>

        <div className="p-4 bg-black/20 text-center">
          <p className="text-[10px] text-gray-500">Secure transactions powered by M-Pesa</p>
        </div>
      </div>
    </div>
  );
}
