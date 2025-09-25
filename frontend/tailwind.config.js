/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    // tailwind.config.js
extend: {
  keyframes: {
    slideInRight: {
      "0%": { transform: "translateX(100%)" },
      "100%": { transform: "translateX(0)" },
    },
    slideOutRight: {
      "0%": { transform: "translateX(0)" },
      "100%": { transform: "translateX(100%)" },
    },
  },
  animation: {
    slideInRight: "slideInRight 0.3s ease-out forwards",
    slideOutRight: "slideOutRight 0.3s ease-in forwards",
  },
}

  },
  plugins: [],
}
