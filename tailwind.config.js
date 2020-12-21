module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        green: {
          default: '#59981A',
          yellow: '#ECF87F',
          lime: '#81B622',
          olive: '#3D550C',
        },        
      }
    },
    darkSelector: '.dark-mode',
  },
  variants: {
    backgroundColor: ['dark', 'dark-hover', 'dark-group-hover', 'dark-even', 'dark-odd', 'hover', 'responsive'],
    borderColor: ['dark', 'dark-focus', 'dark-focus-within', 'hover', 'responsive'],
    textColor: ['dark', 'dark-hover', 'dark-active', 'hover', 'responsive'],
    extend: {
      transitionDelay: ['hover', 'focus'],
    }
  },
  plugins: [
    require('tailwindcss-dark-mode')()
  ]
}
