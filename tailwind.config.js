/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        novaNavy: "#1e3a8a",
        novaGold: "#d4af37",
        novaGoldDark: "#b08d2b",
        novaGray: "#9ca3af",
      },
    },
  },
  plugins: [],
};
