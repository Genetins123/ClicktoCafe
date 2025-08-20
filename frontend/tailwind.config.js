/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       colors: {
        grad1start: '#FEEAF0',
        grad1end: '#F09410',
        grad2start: '#F0D0C7',
        grad2end: '#BC430D',
        grad3start: '#191817ff',
        grad3end: '#BC430D',
        grad4start: '#BC430D',
        grad4end: '#251704ff',
        headtext:'#f97316'
      },
    },
  },
  plugins: [],
}