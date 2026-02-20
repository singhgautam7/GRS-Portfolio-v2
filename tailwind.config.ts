import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Semantic tokens (CSS variable driven)
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                // Direct accent for use in text/borders
                emerald: {
                    DEFAULT: "#00FFB3",
                    dim: "#00cc8f",
                    tint: "var(--emerald-tint, rgba(0, 255, 179, 0.08))",
                    glow: "var(--emerald-glow, rgba(0, 255, 179, 0.15))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
                xl: "1rem",
                "2xl": "1.5rem",
                "3xl": "1.75rem",
                full: "9999px",
            },
            boxShadow: {
                'elevation': '0 8px 24px rgba(0, 0, 0, 0.25)',
                'elevation-sm': '0 2px 8px rgba(0, 0, 0, 0.15)',
                'elevation-md': '0 4px 16px rgba(0, 0, 0, 0.2)',
                'elevation-lg': '0 8px 24px rgba(0, 0, 0, 0.25)',
            },
            fontFamily: {
                sans: [
                    "var(--font-sans)",
                    "Inter",
                    "-apple-system",
                    "system-ui",
                    "sans-serif",
                ],
                mono: [
                    "var(--font-mono)",
                    "JetBrains Mono",
                    "Fira Code",
                    "monospace",
                ],
            },
            fontSize: {
                xxs: "11px",
                xs: "12px",
                sm: "14px",
                md: "16px",
                lg: "18px",
                xl: "20px",
                "2xl": "24px",
                "3xl": "30px",
                "4xl": "36px",
                "5xl": "48px",
            },
            animation: {
                "fade-up": "fadeUp 0.5s ease forwards",
                "fade-in": "fadeIn 0.5s ease forwards",
                "glow-pulse": "glowPulse 2s ease-in-out infinite",
            },
            keyframes: {
                fadeUp: {
                    "0%": { opacity: "0", transform: "translateY(16px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                glowPulse: {
                    "0%, 100%": { boxShadow: "0 0 0 0 rgba(0, 255, 179, 0)" },
                    "50%": { boxShadow: "0 0 16px 2px rgba(0, 255, 179, 0.15)" },
                },
            },
            transitionTimingFunction: {
                smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
            },
            maxWidth: {
                content: "900px",
                page: "1200px",
            },
            spacing: {
                section: "8rem",
                "section-sm": "5rem",
                "nav-height": "64px",
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};

export default config;
