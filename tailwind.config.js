/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        typewriter: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        blink: {
          '50%': { borderColor: 'transparent' },
        },
      },
      animation: {
        typewriter: 'typewriter 3s steps(40) 1s 1 normal both, blink .5s step-end infinite alternate',
      },
      colors: {
        'gray-900': '#1a202c',
        'gray-800': '#2d3748',
        'gray-700': '#4a5568',
        'blue-600': '#3182ce',
        'blue-700': '#2b6cb0',
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ['hover'],
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
