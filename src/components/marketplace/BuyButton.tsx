"use client";

import { useState } from "react";
import { Zap } from "lucide-react";
import PaymentModal from "./PaymentModal";

interface BuyButtonProps {
  productId: string;
  productName: string;
  priceUSD: number;
  priceType: "lifetime" | "monthly";
}

export default function BuyButton({ productId, productName, priceUSD, priceType }: BuyButtonProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button 
        onClick={() => setShowModal(true)}
        className="btn-gold w-full mb-4 flex items-center justify-center space-x-2"
      >
        <span>Buy Now</span>
        <Zap size={20} />
      </button>

      {showModal && (
        <PaymentModal 
          productId={productId}
          productName={productName}
          priceUSD={priceUSD}
          priceType={priceType}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
