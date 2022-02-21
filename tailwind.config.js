module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        spartan: ['Spartan', 'sans-serif']
      },
      colors: {
        black: '#121212',
        white: '#fefefe',
        pale: {
          black: '#151515',
          white: '#f1f1f1'
        }
      }
    },
  },
  plugins: [],
};
