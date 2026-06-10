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
  monthly_return?: string;
  total_trades?: number;
  rating?: number;
  review_count?: number;
}

export const MOCK_BOTS: EAProduct[] = [
  {
    id: "1",
    name: "Elite Scalper v7",
    slug: "elite-scalper-v7",
    short_description: "High-frequency institutional scalper optimized for major pairs with sub-pip precision.",
    description: "The Elite Scalper v7 is our flagship Expert Advisor, engineered to capitalize on micro-movements in the forex market with institutional-level precision. Using advanced order flow analysis and tick-level data processing, it identifies high-probability entry points during London and New York sessions. The EA features dynamic position sizing, multi-timeframe confirmation filters, and an intelligent news filter that automatically pauses trading during high-impact events.",
    price_lifetime: 499,
    price_monthly: 49,
    win_rate: 87.5,
    drawdown: 4.2,
    profit_factor: 2.41,
    pairs: ["EURUSD", "GBPUSD", "USDJPY"],
    timeframes: ["M1", "M5"],
    risk_level: "Medium",
    monthly_return: "12.4%",
    total_trades: 15420,
    rating: 4.8,
    review_count: 342,
  },
  {
    id: "2",
    name: "Trend Master Pro",
    slug: "trend-master-pro",
    short_description: "Swing trading bot that follows long-term institutional trends with precision entries.",
    description: "Trend Master Pro identifies and follows powerful market trends using advanced multi-timeframe analysis and price action filters. Built for traders who prefer quality over quantity, this EA waits for optimal setups and rides trends for maximum profit. Features include adaptive trailing stops, correlation analysis to avoid overexposure, and automatic trend exhaustion detection.",
    price_lifetime: 349,
    price_monthly: 35,
    win_rate: 68.2,
    drawdown: 8.5,
    profit_factor: 1.85,
    pairs: ["XAUUSD", "GBPUSD", "AUDUSD"],
    timeframes: ["H1", "H4"],
    risk_level: "Low",
    monthly_return: "8.7%",
    total_trades: 4820,
    rating: 4.6,
    review_count: 218,
  },
  {
    id: "3",
    name: "Gold Sniper EA",
    slug: "gold-sniper-ea",
    short_description: "Specialized algorithm for high-precision XAUUSD trading with volatility breakout strategies.",
    description: "Designed specifically for Gold (XAUUSD), this EA uses a unique combination of volume analysis, volatility breakout strategies, and institutional supply/demand zone detection. Gold Sniper excels during Asian and London sessions when gold volatility is highest. Features include spread-aware entry logic, session-based trading schedules, and dynamic lot sizing based on account equity.",
    price_lifetime: 599,
    price_monthly: 59,
    win_rate: 91.4,
    drawdown: 12.8,
    profit_factor: 3.12,
    pairs: ["XAUUSD"],
    timeframes: ["M15"],
    risk_level: "High",
    monthly_return: "18.2%",
    total_trades: 8950,
    rating: 4.9,
    review_count: 567,
  },
  {
    id: "4",
    name: "Crypto Quantum EA",
    slug: "crypto-quantum-ea",
    short_description: "Multi-asset EA optimized for Bitcoin, Ethereum, and altcoin CFD trading.",
    description: "Crypto Quantum EA brings institutional-grade algorithmic trading to cryptocurrency CFDs. Using on-chain data analysis, social sentiment indicators, and traditional technical analysis, this EA identifies high-probability trades across major crypto pairs. Features include 24/7 trading capability, volatility-adaptive position sizing, and automatic correlation management between crypto pairs.",
    price_lifetime: 699,
    price_monthly: 69,
    win_rate: 74.8,
    drawdown: 15.3,
    profit_factor: 2.15,
    pairs: ["BTCUSD", "ETHUSD", "LTCUSD", "XRPUSD"],
    timeframes: ["M30", "H1"],
    risk_level: "High",
    monthly_return: "22.1%",
    total_trades: 12340,
    rating: 4.5,
    review_count: 189,
  },
  {
    id: "5",
    name: "Night Hunter Pro",
    slug: "night-hunter-pro",
    short_description: "Overnight range trading bot that profits from Asian session consolidation patterns.",
    description: "Night Hunter Pro specializes in capturing profits from the Asian session's characteristic range-bound price action. Using advanced support/resistance detection and mean-reversion algorithms, this EA identifies optimal entry points during low-volatility periods. Perfect for traders who prefer set-and-forget automation during overnight hours. Features include automatic session detection, range-bound market filters, and smart exit logic.",
    price_lifetime: 299,
    price_monthly: 29,
    win_rate: 82.1,
    drawdown: 3.8,
    profit_factor: 1.95,
    pairs: ["EURUSD", "USDJPY", "NZDUSD"],
    timeframes: ["H1"],
    risk_level: "Low",
    monthly_return: "6.4%",
    total_trades: 6780,
    rating: 4.7,
    review_count: 298,
  },
  {
    id: "6",
    name: "Grid Master Ultimate",
    slug: "grid-master-ultimate",
    short_description: "Advanced grid trading system with intelligent drawdown management and recovery algorithms.",
    description: "Grid Master Ultimate takes the proven grid trading strategy to the next level with intelligent drawdown management and adaptive recovery algorithms. Unlike traditional grid systems, this EA dynamically adjusts grid spacing based on market volatility, uses trend filters to avoid trading against strong momentum, and features an emergency shutdown mechanism to protect your capital during extreme market events.",
    price_lifetime: 449,
    price_monthly: 45,
    win_rate: 71.5,
    drawdown: 11.2,
    profit_factor: 1.78,
    pairs: ["EURUSD", "GBPUSD", "AUDUSD", "USDCHF"],
    timeframes: ["M5", "M15"],
    risk_level: "Medium",
    monthly_return: "9.8%",
    total_trades: 21560,
    rating: 4.4,
    review_count: 156,
  },
];

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export const MOCK_REVIEWS: Review[] = [
  {
    id: "r1",
    author: "James M.",
    rating: 5,
    date: "2026-05-15",
    comment: "Best EA I've ever used. Consistent profits for 3 months straight. The support team is incredibly responsive.",
    verified: true,
  },
  {
    id: "r2",
    author: "Sarah K.",
    rating: 5,
    date: "2026-05-10",
    comment: "Was skeptical at first but the results speak for themselves. Made back my investment in the first week.",
    verified: true,
  },
  {
    id: "r3",
    author: "Michael R.",
    rating: 4,
    date: "2026-04-28",
    comment: "Solid performance overall. Had a small drawdown period but recovered well. Good risk management.",
    verified: true,
  },
  {
    id: "r4",
    author: "David L.",
    rating: 5,
    date: "2026-04-15",
    comment: "The installation guide was clear and the VPS support helped me get set up quickly. Profitable from day one.",
    verified: true,
  },
  {
    id: "r5",
    author: "Anna P.",
    rating: 4,
    date: "2026-03-22",
    comment: "Good EA with consistent returns. Would love to see more customization options in future updates.",
    verified: false,
  },
];
