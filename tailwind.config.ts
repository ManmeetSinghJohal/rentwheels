import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./contexts/**/*.{ts,tsx}", "./@/**/*.{ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        adds1: "url('/images/bg-1.svg')",
        adds2: "url('/images/bg-2.svg')",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        plusJakartaSans: ["Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        primary: "rgba(131, 62, 255, 1)",
        secondary: "rgba(121, 52, 176, 1)",
        default: {
          50: "#C3D4E9",
          100: "#94A7CB",
        },
        white: {
          50: "#FFFFFF",
          100: "#F7F9FC",
          200: "#F6F7F9",
        },
        gray: {
          400: "#90A3BF",
          700: "#3D5278",
          800: "#424B5C",
          850: "#293346",
          900: "#1A202C",
        },
      },
      stroke: (theme: any) => ({
        "gray-700": theme("colors.gray.700"),
        "gray-200": theme("colors.gray.200"),
      }),
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
