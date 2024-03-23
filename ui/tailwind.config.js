/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        'custom-gray': 'rgba(187, 193, 192, 0.75)',
      },
      backgroundImage: {
        main: "url('/bgImage.jpeg')",
      },
    },
  },
};
