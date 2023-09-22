/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        Kanity: ["Kanit", "sans-serif"],
        Lato: ["Lato", "sans-serif"],
        Prompt: ["Prompt", "sans-serif"],
        Roboto: ["Roboto", "sans-serif"],
        Russo: ["Russo One", "sans-serif"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
