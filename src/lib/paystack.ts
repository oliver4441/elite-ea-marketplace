import axios from "axios";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

interface PaystackMetadata {
  user_id: string;
  product_id: string;
  price_type: "lifetime" | "monthly";
}

export const initializeTransaction = async (email: string, amount: number, metadata: PaystackMetadata) => {
  if (!PAYSTACK_SECRET_KEY) {
    throw new Error("Paystack secret key is not set");
  }

  const response = await axios.post(
    "https://api.paystack.co/transaction/initialize",
    {
      email,
      amount: Math.round(amount * 100), // Paystack expects amount in subunits (e.g., kobo or cents)
      metadata,
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/paystack/verify`,
    },
    {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const verifyTransaction = async (reference: string) => {
  if (!PAYSTACK_SECRET_KEY) {
    throw new Error("Paystack secret key is not set");
  }

  const response = await axios.get(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
    }
  );

  return response.data;
};
