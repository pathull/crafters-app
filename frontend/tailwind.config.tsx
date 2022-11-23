/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#002244',
        'light-grey': '#f6f6f6',
        'soft-purple': '#6244bb',
        'light-white': 'rgba(255, 255, 255, 0.18)',
      },
    },
  },
  variant: {},
  plugins: [require('@tailwindcss/forms')],
};
