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
        coastal: {
          900: "#252f4a",
          800: "#3c506f",
          700: "#5d7fa0",
          600: "#6b95ba",
          400: "#89adc8",
          200: "#c9dce8",
        },
        sand: {
          100: "#faf7f2",
          200: "#f3ede4",
        },
      },
      fontFamily: {
        display: [
          "marlide",
          "Playfair Display",
          "Georgia",
          "serif",
        ],
        "body-serif": [
          "minion-pro",
          "Source Serif 4",
          "Georgia",
          "serif",
        ],
        ui: [
          "neue-haas-grotesk-display",
          "DM Sans",
          "-apple-system",
          "sans-serif",
        ],
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0,0,0,0.05)",
        DEFAULT: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)",
        md: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
        lg: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
        xl: "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};
export default config;
