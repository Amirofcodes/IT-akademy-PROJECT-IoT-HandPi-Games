module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        }
      },
      animation: {
        blink: 'blink 1.5s ease-in-out infinite',
      },
      maxWidth: {
        46: "2.875 rem",
        320: "1728px",
      },
      backgroundImage: {
        "button-gradient": 'linear-gradient(90deg, #70DD4A 0%, #43B226 100%)',
        "gradient-violet": 'linear-gradient(to right, #C0B7E8, #8176AF)',
      },
      colors: {
        "custom-bg": "#302C42",
        gradientStart: '#C0B7E8',
        gradientEnd: '#8176AF',
       "number-color": '#343045',
       number: '#0D0D0D'
      },
    },
    container: {
      center: true,
      padding: "2rem",
    },
  },
  plugins: [],
};
