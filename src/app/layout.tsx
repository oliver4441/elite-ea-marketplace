import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Elite EA Marketplace | Premium Forex Trading Bots",
  description: "Automate your trading with institutional-grade Forex Expert Advisors. Precision algorithms for consistent returns.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
