/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        phase1: '#185FA5',
        phase2: '#3B6D11',
        phase3: '#993C1D',
        phase4: '#534AB7',
      }
    },
  },
  plugins: [],
}

