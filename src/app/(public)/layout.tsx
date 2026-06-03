import Navbar from "@/components/landing/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <footer className="border-t border-elite-border py-12 bg-black">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 Elite EA Marketplace. All rights reserved. 
            <br />
            <span className="text-xs mt-2 block opacity-50">Trading Forex involves significant risk. Past performance is not indicative of future results.</span>
          </p>
        </div>
      </footer>
    </>
  );
}
