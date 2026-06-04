"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "EA Bots", href: "/bots" },
    { name: "Pricing", href: "/pricing" },
    { name: "Performance", href: "/performance" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-lg border-b border-elite-border py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gold-gradient rounded-lg flex items-center justify-center font-bold text-black text-xl">
            E
          </div>
          <span className="text-2xl font-bold gold-text">ELITE EA</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-elite-gold transition-colors font-medium"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="https://wa.me/254726090372" 
            target="_blank"
            className="text-gray-400 hover:text-green-500 transition-colors"
            title="Chat on WhatsApp"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.319 1.592 5.548 0 10.058-4.51 10.061-10.062 0-2.69-1.047-5.216-2.947-7.117-1.9-1.901-4.424-2.947-7.113-2.947-5.552 0-10.061 4.51-10.064 10.063 0 2.13.57 4.218 1.648 5.922l-1.077 3.931 4.193-1.082zm11.336-7.31c-.305-.152-1.802-.888-2.081-.99-.278-.101-.48-.152-.682.152-.202.304-.783 1.013-.96 1.216-.177.203-.354.228-.659.076-.305-.152-1.287-.474-2.451-1.511-.906-.808-1.517-1.806-1.695-2.11-.177-.304-.019-.468.133-.619.136-.136.305-.355.457-.532.152-.177.202-.304.304-.507.101-.202.051-.38-.025-.532-.076-.152-.682-1.646-.935-2.254-.247-.591-.498-.51-.682-.519-.177-.009-.38-.011-.582-.011-.203 0-.532.076-.81.38-.278.304-1.063 1.039-1.063 2.532s1.089 2.938 1.241 3.141c.152.202 2.144 3.273 5.193 4.589.725.312 1.291.499 1.731.638.728.23 1.391.197 1.915.119.584-.087 1.802-.736 2.055-1.445.253-.709.253-1.317.177-1.445-.076-.127-.278-.203-.582-.355z"/>
            </svg>
          </Link>
          <Link href="/auth/login" className="btn-outline-gold py-2 px-6 text-sm">
            Client Area
          </Link>
          <Link href="/auth/register" className="btn-gold py-2 px-6 text-sm">
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-elite-gold" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-elite-surface border-b border-elite-border"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-elite-gold transition-colors text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-3 pt-4 border-t border-elite-border">
                <Link href="/auth/login" className="btn-outline-gold text-center py-2" onClick={() => setIsOpen(false)}>
                  Client Area
                </Link>
                <Link href="/auth/register" className="btn-gold text-center py-2" onClick={() => setIsOpen(false)}>
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
