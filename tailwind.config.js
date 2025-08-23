/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        // you can extend colors, fonts, spacing etc here
      },
    },
    plugins: [
      require('tailwind-scrollbar')({ nocompatible: true }),
    ],
  };
  