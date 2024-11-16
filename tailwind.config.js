module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        dark: '#202020',
        black: '#000000',
        grayish: '#262629',
        green: '#41B67B',
        lightgray: '#AFB1B9',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
