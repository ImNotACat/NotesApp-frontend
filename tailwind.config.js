/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",  // <-- tells Tailwind where to look for class usage
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  