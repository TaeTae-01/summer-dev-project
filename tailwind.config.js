/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#845EC2",
        secondary: "#FFC75F",
        secondary2: "#2C73D2",
        textPrimary: "#333333",
        textSecondary: "#888888",
        background: "#FAFAFA",
      },
      fontFamily: {
        "pretendard": ["Pretendard", "sans-serif"],
      }
    },
  },
  plugins: [],
} 