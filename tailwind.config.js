/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ["var(--font-bebas)"],
        questrial: ["var(--font-questrial)"],
      },
      animation: {
        bounceIn: "bounceIn 0.5s ease-out",
        bounceInFadeOut: "bounceInFadeOut 3s ease-out",
      },
      keyframes: {
        bounceIn: {
          "0%": {
            transform: "scale(0.3)",
            opacity: "0",
          },
          "50%": {
            transform: "scale(1.06)",
            opacity: "1",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        bounceInFadeOut: {
          "0%": {
            transform: "scale(0.3)",
            opacity: "0",
          },
          "5%": {
            transform: "scale(1)",
            opacity: "1",
          },
          "100%": {
            transform: "scale(0)",
            opacity: "0",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {},
    },
  },
  plugins: [daisyui, tailwindcssAnimate],
};
