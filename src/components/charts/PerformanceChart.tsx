"use client";

import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

interface ChartData {
  name: string;
  equity: number;
  balance: number;
}

const generateRealisticStats = (days: number): ChartData[] => {
  const data: ChartData[] = [];
  let balance = 10000;
  let equity = 10000;

  // Simulate realistic forex trading: steady upward trend with periodic drawdowns
  for (let i = 0; i <= days; i++) {
    // Base trend: slight upward bias (profitable EA)
    const trendComponent = 15 + Math.random() * 25;
    
    // Random noise: market volatility
    const noiseComponent = (Math.random() - 0.45) * 80;
    
    // Occasional drawdown periods (every ~10-15 days)
    const isDrawdownPeriod = i > 0 && i % 12 < 4;
    const drawdownComponent = isDrawdownPeriod ? -(Math.random() * 60 + 20) : 0;
    
    const dailyProfit = trendComponent + noiseComponent + drawdownComponent;
    balance += dailyProfit;
    equity = balance - (Math.random() * 120 + 30);
    
    // Ensure balance doesn't go below starting point too much
    balance = Math.max(balance, 9000);
    equity = Math.max(equity, 8800);
    
    data.push({
      name: `Day ${i}`,
      balance: Math.round(balance),
      equity: Math.round(equity),
    });
  }
  return data;
};

interface PerformanceChartProps {
  days?: number;
  height?: number;
  showHeader?: boolean;
}

const PerformanceChart = ({ days = 30, height = 400, showHeader = true }: PerformanceChartProps) => {
  const data = generateRealisticStats(days);
  const startBalance = data[0]?.balance || 10000;
  const endBalance = data[data.length - 1]?.balance || 10000;
  const totalReturn = ((endBalance - startBalance) / startBalance * 100).toFixed(1);
  const isPositive = endBalance >= startBalance;

  return (
    <div className="w-full glass-card p-6 border-elite-gold/20">
      {showHeader && (
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-bold">Growth Analysis</h3>
            <p className="text-xs text-gray-500">Live Equity & Balance Tracking</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase">Total Return</p>
              <p className={`text-lg font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {isPositive ? '+' : ''}{totalReturn}%
              </p>
            </div>
            <div className="flex items-center space-x-4 text-xs font-mono">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-elite-gold rounded-full mr-2" />
                <span className="text-gray-400">Balance</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-white/40 rounded-full mr-2" />
                <span className="text-gray-400">Equity</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
          <XAxis 
            dataKey="name" 
            hide={true}
          />
          <YAxis 
            domain={['dataMin - 200', 'dataMax + 200']} 
            stroke="#666" 
            fontSize={12}
            tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "#121212", 
              border: "1px solid rgba(212, 175, 55, 0.2)", 
              borderRadius: "8px",
              fontSize: "12px",
            }}
            itemStyle={{ color: "#D4AF37" }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
          />
          <Area 
            type="monotone" 
            dataKey="balance" 
            stroke="#D4AF37" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorBalance)" 
          />
          <Line 
            type="monotone" 
            dataKey="equity" 
            stroke="#ffffff40" 
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
