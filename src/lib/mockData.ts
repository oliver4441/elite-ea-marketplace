export interface EAProduct {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  description: string;
  price_lifetime: number;
  price_monthly: number;
  win_rate: number;
  drawdown: number;
  profit_factor: number;
  pairs: string[];
  timeframes: string[];
  risk_level: 'Low' | 'Medium' | 'High';
}

export const MOCK_BOTS: EAProduct[] = [
  {
    id: "1",
    name: "Elite Scalper v7",
    slug: "elite-scalper-v7",
    short_description: "High-frequency institutional scalper optimized for major pairs.",
    description: "The Elite Scalper v7 is our flagship EA, designed to capitalize on micro-movements in the market with institutional-level precision.",
    price_lifetime: 499,
    price_monthly: 49,
    win_rate: 87.5,
    drawdown: 4.2,
    profit_factor: 2.41,
    pairs: ["EURUSD", "GBPUSD", "USDJPY"],
    timeframes: ["M1", "M5"],
    risk_level: "Medium"
  },
  {
    id: "2",
    name: "Trend Master Pro",
    slug: "trend-master-pro",
    short_description: "Swing trading bot that follows long-term institutional trends.",
    description: "Trend Master Pro identifies and follows powerful market trends using advanced multi-timeframe analysis and price action filters.",
    price_lifetime: 349,
    price_monthly: 35,
    win_rate: 68.2,
    drawdown: 8.5,
    profit_factor: 1.85,
    pairs: ["XAUUSD", "GBPUSD", "AUDUSD"],
    timeframes: ["H1", "H4"],
    risk_level: "Low"
  },
  {
    id: "3",
    name: "Gold Sniper EA",
    slug: "gold-sniper-ea",
    short_description: "Specialized algorithm for high-precision XAUUSD trading.",
    description: "Designed specifically for Gold (XAUUSD), this EA uses a unique combination of volume analysis and volatility breakout strategies.",
    price_lifetime: 599,
    price_monthly: 59,
    win_rate: 91.4,
    drawdown: 12.8,
    profit_factor: 3.12,
    pairs: ["XAUUSD"],
    timeframes: ["M15"],
    risk_level: "High"
  }
];
