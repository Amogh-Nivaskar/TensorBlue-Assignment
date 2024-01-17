/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0E1525",
        secondary: "#1C2232",
        tertiary: "#1E1F24",
        topbar: "#1E1E1E",
        borderColor: "#4F5561",
      },
    },
  },
  plugins: [],
};
