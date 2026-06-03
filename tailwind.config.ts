import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        elite: {
          gold: "#D4AF37",
          "gold-light": "#F1D592",
          "gold-dark": "#996515",
          dark: "#050505",
          surface: "#121212",
          border: "rgba(212, 175, 55, 0.2)",
        },
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #D4AF37 0%, #F1D592 50%, #996515 100%)",
        "dark-gradient": "radial-gradient(circle at center, #121212 0%, #050505 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(212, 175, 55, 0.2)" },
          "100%": { boxShadow: "0 0 20px rgba(212, 175, 55, 0.5)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
