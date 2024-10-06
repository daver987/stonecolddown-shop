import defaultTheme from 'tailwindcss/defaultTheme'
import animate from 'tailwindcss-animate'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import aspectRatio from '@tailwindcss/aspect-ratio'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js,ts,jsx,tsx}',
    './layouts/**/*.{vue,js,ts,jsx,tsx}',
    './pages/**/*.{vue,js,ts,jsx,tsx}',
    './app/**/*.{vue,js,ts,jsx,tsx}',
  ],
  container: {
    center: true,
    padding: '1rem',
    maxWidth: '1400px',
  },
  theme: {
    extend: {
      fontFamily: {
        heading: ["'Stockport-Extra'", ...defaultTheme.fontFamily.sans],
        sans: ['Lato'],
        serif: ["'Stockport-Brush'", ...defaultTheme.fontFamily.serif],
      },
      colors: {
        amber: {
          50: '#f5f4ef',
          100: '#e9e4d8',
          200: '#d5ccb3',
          300: '#bdad89',
          400: '#a89167',
          500: '#987f57',
          600: '#82684a',
          700: '#6a523e',
          800: '#5a463a',
          900: '#503e34',
          950: '#2d201b',
        },
      },
    },
  },
  plugins: [animate, forms, typography, aspectRatio],
}
