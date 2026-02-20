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
                // CSS variable-based semantic colors (shadcn pattern)
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
                // Portfolio-specific raw colors
                navy: {
                    DEFAULT: "#000000",
                    dark: "#0c0c0c",
                    light: "#0f0f0f",
                    lightest: "#233554",
                    shadow: "rgba(2, 12, 27, 0.7)",
                },
                slate: {
                    dark: "#495670",
                    DEFAULT: "#8892b0",
                    light: "#a8b2d1",
                    lightest: "#ccd6f6",
                },
                white: {
                    DEFAULT: "#e6f1ff",
                },
                green: {
                    DEFAULT: "#64ffda",
                    tint: "rgba(100, 255, 218, 0.1)",
                },
                pink: {
                    DEFAULT: "#f57dff",
                },
                blue: {
                    DEFAULT: "#57cbff",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                sans: [
                    "var(--font-sans)",
                    "Inter",
                    "San Francisco",
                    "SF Pro Text",
                    "-apple-system",
                    "system-ui",
                    "sans-serif",
                ],
                mono: [
                    "var(--font-mono)",
                    "JetBrains Mono",
                    "Fira Code",
                    "Fira Mono",
                    "Roboto Mono",
                    "monospace",
                ],
            },
            fontSize: {
                xxs: "12px",
                xs: "13px",
                sm: "14px",
                md: "16px",
                lg: "18px",
                xl: "20px",
                xxl: "22px",
                heading: "32px",
            },
            animation: {
                "fade-up": "fadeUp 0.5s ease forwards",
                "fade-down": "fadeDown 0.5s ease forwards",
                "fade-in": "fadeIn 0.5s ease forwards",
                "slide-in-right": "slideInRight 0.3s ease forwards",
                "slide-in-left": "slideInLeft 0.3s ease forwards",
            },
            keyframes: {
                fadeUp: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                fadeDown: {
                    "0%": { opacity: "0", transform: "translateY(-20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideInRight: {
                    "0%": { opacity: "0", transform: "translateX(20px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
                slideInLeft: {
                    "0%": { opacity: "0", transform: "translateX(-20px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
            },
            transitionTimingFunction: {
                portfolio: "cubic-bezier(0.645, 0.045, 0.355, 1)",
            },
            maxWidth: {
                content: "1000px",
                page: "1600px",
            },
            spacing: {
                "nav-height": "100px",
                "nav-scroll-height": "70px",
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};

export default config;
