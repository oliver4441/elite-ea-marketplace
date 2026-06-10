import type { Metadata } from "next";
import "./globals.css";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import { Toaster } from "sonner";

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
        <Toaster position="top-right" richColors />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
