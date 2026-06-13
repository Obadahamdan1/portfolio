import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Dark, deep-navy base — repurposed token names so existing
        // class usages (bg-cream, text-ink, etc.) flip to the dark theme.
        cream: "#0A0F1C", // page background (near-black navy)
        surface: "#111A2E", // raised card / panel
        ink: "#E8EEF7", // primary text (near-white)
        muted: "#8593AC", // secondary text (slate)
        terracotta: "#5FE3C0", // PRIMARY accent — mint/teal (was terracotta)
        sage: "#4ADE80", // secondary accent — emerald green
        line: "#1E2A40", // hairline borders
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        content: "75rem",
      },
      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "float-slow": "float-slow 6s ease-in-out infinite",
        blink: "blink 1.1s step-end infinite",
        "pulse-glow": "pulse-glow 2.4s ease-in-out infinite",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.32, 0.72, 0, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
