/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./src/**/*.{html,ts}",
     "./node_modules/tw-elements/js/**/*.js",
  ],
  theme: {
    fontFamily: {
      'sans': 'Poppins, ui-sans-serif, system-ui',
      'serif': 'Poppins, ui-sans-serif, system-ui'
    },
    fontSize: {
      sm: ' 0,875rem',
      base: '1.3rem',
      xl: '1.55rem'
    },
    extend: {},
  },
  daisyui: {
    themes: [
      {
        'fantasy': {
          primary: '#000000',
          'primary-content': 'white',
          secondary: '#e5e6e6',
          neutral: '#E8E8E8'
        }
      }
    ],
    base: true,
    styled: true,
    utils: true,
    prefix: '',
    logs: true,
    themeRoot: ':root'
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
    require("tw-elements/plugin.cjs")
  ],
  darkMode: "class"
};

