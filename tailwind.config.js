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
        DEFAULT: '#2e2e2e',
        100: '#f2f2f2',
        200: '#e5e5e5',
        300: '#d9d9d9',
        400: '#b3b3b3',
        500: '#808080',
      },
    },
    fontSize: {
      xs: ['0.875rem', {lineHeight: '1.25rem'}], //14 / 20
      sm: ['1rem', {lineHeight: '1.375rem'}], // 16 / 22
      base: ['0.9375rem', {lineHeight: '1.25rem'}], //15 / 20
      md: ['1.125rem', {lineHeight: '1.625rem'}], // 18 / 26
      lg: ['1.375rem', {lineHeight: '1.687rem'}], // 22 / 27
      xl: ['1.75rem', {lineHeight: '2.1rem'}], // 28 / 33.6
      '2xl': ['2rem', {lineHeight: '2.4rem'}], // 32 / 38.4
      '3xl': ['2.625rem', {lineHeight: '3.25rem'}], // 42 / 52
    },
    borderRadius: {
      none: '0px',
      xs: 'var(--tui-radius-xs)',
      sm: 'var(--tui-radius-sm)',
      md: 'var(--tui-radius-md)',
      lg: 'var(--tui-radius-lg)',
      full: '9999px',
    },
    boxShadow: {
      DEFAULT: '0px 5px 40px rgba(0, 0, 0, 0.05)',
      sm: '0px 24px 54px rgba(0, 0, 0, 0.04)',
      md: '0px 24px 54px rgba(0, 0, 0, 0.1)',
    },
    extend: {
      fontFamily: {
        heading: ['Kelson Sans', ...defaultTheme.fontFamily.sans],
        base: ['TT Norms Pro', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')],
}
