module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        "2xl": "1440px",
        xs: "390px", // Nouveau point de rupture
      },
      width: {
        75: "300px",
      },
      height: {
        42.25: "169px", // Ajoutez cette ligne pour la hauteur
      },
      maxWidth: {
        46: "2.875 rem",
        320: "1728px",
      },
      backgroundImage: {
        "button-gradient": "linear-gradient(90deg, #70DD4A 0%, #43B226 100%)",
        "gradient-violet": "linear-gradient(to right, #C0B7E8, #8176AF)",
      },
      colors: {
        "custom-bg": "#302C42",
        gradientStart: "#C0B7E8",
        gradientEnd: "#8176AF",
      },
    },
    container: {
      center: true,
      padding: "2rem",
    },
  },
  plugins: [],
};
