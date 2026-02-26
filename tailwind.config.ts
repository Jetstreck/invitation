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
        ivory: "#FFFFF0",
        pearl: "#FBFBF9",
        champagne: "#F7E7CE",
        goldGlow: "#D4AF37",
        goldLight: "#F0D060",
        goldDeep: "#B8962A",
        warmBeige: "#F5F5DC",
        glassWhite: "rgba(251,251,249,0.55)",
        overlay: "rgba(255, 255, 240, 0.6)",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        decorative: ["var(--font-cinzel)", "serif"],
      },
      backgroundImage: {
        "subtle-marble": 'url("/marble.png")',
        "sunlight-gradient": "linear-gradient(180deg, rgba(255,255,240,0) 0%, rgba(247,231,206,0.2) 100%)",
        "gold-shimmer": "linear-gradient(90deg, #D4AF37 0%, #F7E7CE 40%, #F0D060 50%, #D4AF37 70%)",
        "gold-border": "linear-gradient(135deg, #D4AF37, #F7E7CE, #D4AF37 70%, #B8962A)",
      },
      boxShadow: {
        "gold-soft": "0 4px 24px rgba(212,175,55,0.08), 0 1px 0 rgba(255,255,255,0.6) inset",
        "gold-glow": "0 0 30px rgba(212,175,55,0.25), 0 0 60px rgba(212,175,55,0.10)",
        "gold-inner": "inset 0 0 30px rgba(212,175,55,0.08)",
        "card-luxury": "0 8px 40px rgba(212,175,55,0.10), 0 2px 8px rgba(74,64,54,0.06)",
        "card-hover": "0 16px 60px rgba(212,175,55,0.18), 0 4px 16px rgba(74,64,54,0.08)",
      },
      backdropBlur: {
        xs: "4px",
        xl: "20px",
        "2xl": "28px",
        "3xl": "40px",
      },
      animation: {
        "gold-shimmer": "goldShimmer 4s linear infinite",
        "warm-glow": "warmGlow 5s ease-in-out infinite",
        "ambient-float": "ambientFloat 6s ease-in-out infinite",
        "particle-drift": "particleDrift var(--drift-dur, 4s) ease-out infinite",
        "inner-glow": "innerGlowPulse 4s ease-in-out infinite",
        "light-ray": "lightRayPulse 3s ease-in-out infinite",
        "number-flip": "numberFlip 0.3s ease-out",
      },
      keyframes: {
        goldShimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        warmGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.75", transform: "scale(1.08)" },
        },
        ambientFloat: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        particleDrift: {
          "0%": { transform: "translateY(0) translateX(0)", opacity: "0" },
          "20%": { opacity: "0.7" },
          "80%": { opacity: "0.4" },
          "100%": { transform: "translateY(-120px) translateX(var(--drift-x,8px))", opacity: "0" },
        },
        innerGlowPulse: {
          "0%, 100%": { boxShadow: "inset 0 0 20px rgba(212,175,55,0.08)" },
          "50%": { boxShadow: "inset 0 0 40px rgba(212,175,55,0.18)" },
        },
        lightRayPulse: {
          "0%, 100%": { opacity: "0.15" },
          "50%": { opacity: "0.35" },
        },
        numberFlip: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
