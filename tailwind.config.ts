import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#14532d", // Deep Green
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#facc15", // Warm Yellow
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "#fefce8", // Soft Beige
          foreground: "hsl(var(--accent-foreground))",
        },
        mango: {
          light: "#FFD580", // Light Mango
          DEFAULT: "#FF9F00", // Mango Orange
          dark: "#E67E00", // Dark Mango
        },
        leaf: {
          light: "#4CAF50", // Light Leaf Green
          DEFAULT: "#2E7D32", // Leaf Green
          dark: "#1B5E20", // Dark Leaf Green
        },
        sky: {
          light: "#B3E0FF", // Light Sky Blue (from image)
          DEFAULT: "#87CEEB", // Sky Blue (from image)
          dark: "#4682B4", // Dark Sky Blue (from image)
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundColor: {
        "logo-bg": "#E6F2FF", // Light blue background matching the logo
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
