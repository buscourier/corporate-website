const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
// const plugin = require('tailwindcss')
const plugin = require('tailwindcss/plugin')

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
    fontSize: {
      '2xs': ['0.8125rem', {lineHeight: '1rem'}], //13 / 16
      xs: ['0.875rem', {lineHeight: '1.25rem'}], //14 / 20
      sm: ['1rem', {lineHeight: '1.375rem'}], // 16 / 22
      base: ['0.9375rem', {lineHeight: '1.25rem'}], //15 / 20
      md: ['1.125rem', {lineHeight: '1.625rem'}], // 18 / 26
      lg: ['1.375rem', {lineHeight: '1.687rem'}], // 22 / 27
      xl: ['1.75rem', {lineHeight: '2.1rem'}], // 28 / 33.6
      '2xl': ['2rem', {lineHeight: '2.4rem'}], // 32 / 38.4
      '3xl': ['2.625rem', {lineHeight: '3.25rem'}], // 42 / 52
      '4xl': ['3.563rem', {lineHeight: '4.25rem'}], // 57 / 52
    },
    borderRadius: {
      none: '0px',
      sm: '0.3125rem',
      md: '0.625rem',
      lg: '1.4375rem', //23px
      xl: '1.875rem',
      full: '9999px',
    },
    boxShadow: {
      DEFAULT: '0px 5px 40px rgba(0, 0, 0, 0.05)',
      '2xs': '0px 2px 10px rgba(0, 0, 0, 0.05)',
      xs: '0px 10px 100px rgba(0, 0, 0, 0.1)',
      sm: '0px 4px 15px rgba(0, 0, 0, 0.05);',
      md: '0px 24px 54px rgba(0, 0, 0, 0.04)',
      xl: '0px 24px 54px rgba(0, 0, 0, 0.1)',
    },
    extend: {
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
          900: '#63adf8',
        },
        gray: {
          DEFAULT: '#2e2e2e',
          25: '#fdfdfd',
          50: '#fafafa',
          100: '#f2f2f2',
          200: '#eaeaea',
          300: '#e5e5e5',
          400: '#d9d9d9',
          500: '#b3b3b3',
          600: '#999999',
          700: '#808080',
          800: '#666666',
          900: '#333333',
        },
      },
      fontFamily: {
        heading: ['Kelson Sans', ...defaultTheme.fontFamily.sans],
        base: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        13: '3.25rem',
        22: '5.5rem',
        50: '12.5rem',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': {transform: 'rotate(-3deg)'},
          '50%': {transform: 'rotate(3deg)'},
        },
        fadeIn: {
          '0%': {
            opacity: 0,
            transform: 'translateY(0.25rem)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        fadeIn: 'fadeIn 200ms ease-in-out forwards',
      },
      spacing: {
        90: '22.5rem',
        46: '11.5rem',
      },
      margin: {
        18: '4.375rem',
      },
      backgroundImage: {
        'index-bus': "url('src/assets/images/index/bus-bg@3x.jpg')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    plugin(function ({addVariant}) {
      addVariant('sticky-header', '.sticky-header &')
    }),
    plugin(function ({addVariant}) {
      addVariant('step-invalid', '.stepper-item.invalid &')
    }),
    plugin(function ({addVariant}) {
      addVariant('step-active', '.stepper-item.active &')
    }),
    plugin(function ({addVariant}) {
      addVariant('step-done', '.stepper-item.done &')
    }),
  ],
}
