const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '2.5rem',
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      red: {
        DEFAULT: '#c74141',
      },
      green: {
        DEFAULT: '#2e9c3a',
        100: '#d7f4da',
      },
      yellow: {
        DEFAULT: '#ffdc00',
      },
      blue: {
        DEFAULT: '#50a7ff',
      },
      gray: {
        DEFAULT: '#b3b3b3',
        100: '#f2f2f2',
        200: '#e5e5e5',
        300: '#d9d9d9',
        400: '#b3b3b3',
        500: '#808080',
      },
    },
    borderRadius: {
      none: '0px',
      sm: '0.3125rem',
      md: '0.625rem',
      lg: '1.4375rem',
      xl: '1.875rem',
      full: '9999px',
    },
    boxShadow: {
      DEFAULT: '0px 5px 40px rgba(0, 0, 0, 0.05)',
      sm: '0px 24px 54px rgba(0, 0, 0, 0.04)',
      md: '0px 24px 54px rgba(0, 0, 0, 0.1)',
    },
    extend: {
      fontFamily: {
        sans: ['TT Norms Pro', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')],
}
