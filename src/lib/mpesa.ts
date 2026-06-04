import axios from "axios";

const CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET;
const PASSKEY = process.env.MPESA_PASSKEY;
const SHORTCODE = process.env.MPESA_SHORTCODE;
const CALLBACK_URL = process.env.MPESA_CALLBACK_URL;

export const getAccessToken = async () => {
  const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");
  const response = await axios.get(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    }
  );
  return response.data.access_token;
};

export const stkPush = async (phoneNumber: string, amount: number, accountReference: string) => {
  // If credentials are not set, return a mock response for development
  if (!CONSUMER_KEY || !CONSUMER_SECRET || !SHORTCODE || !PASSKEY) {
    console.warn("M-Pesa credentials not set. Returning mock response.");
    return {
      MerchantRequestID: "mock-" + Math.random().toString(36).substring(7),
      CheckoutRequestID: "mock-" + Math.random().toString(36).substring(7),
      ResponseCode: "0",
      ResponseDescription: "Success. Mock STK Push initiated.",
    };
  }

  const accessToken = await getAccessToken();
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14);
  const password = Buffer.from(`${SHORTCODE}${PASSKEY}${timestamp}`).toString("base64");

  const response = await axios.post(
    "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    {
      BusinessShortCode: SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: Math.round(amount), // M-Pesa expects integers or rounded decimals
      PartyA: phoneNumber,
      PartyB: SHORTCODE,
      PhoneNumber: phoneNumber,
      CallBackURL: CALLBACK_URL,
      AccountReference: accountReference,
      TransactionDesc: "Elite EA Purchase",
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
};
