module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      maxWidth: {
        '320': '1728px',
      },
      backgroundImage: {
        'button-gradient': 'linear-gradient(90deg, #70DD4A 0%, #43B226 100%)',
      },
      colors: {
        'custom-bg': '#302C42',
      },
    },
    container: {
      center: true,
      padding: '2rem',
    },
  },
  plugins: [],
};
