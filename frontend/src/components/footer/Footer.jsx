// Importation de la bibliothèque React
import React from "react";

// Définition du composant Footer
const Footer = () => {
  return (
    // Début de l'élément footer avec des classes de style
    <footer className="bg-[#302C42] text-white py-5">
      <div className="container mx-auto flex-col lg:flex-row flex justify-center lg:justify-between items-center">
        <div className="bg-green-500 rounded-full flex justify-center items-center w-[214px] h-[48px] ">
          <p className="text-[#302C42] text-lg m-0 gras majuscules">Jouer</p>
        </div>

        <div className="logo xs:w-75 xs:h-42.25 2xl:h-[169px] 2xl:w-[300px] h-[144px] w-[247px] mb-4 lg:mb-0">
          <img
            src="../../public/img/footer-logo.png"
            alt="Logo du pied de page"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex items-center">
          <div>
            <p>E-mail</p>
            <form
              action="/submit-email"
              method="post"
              className="xs:w-[263px] flex items-center w-[430px] h-[48px] rounded-[30px] bg-gradient-to-r from-[#70DD4A] to-[#FFFFFF] "
            >
              <label htmlFor="email" className="sr-only">
                Email :
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full h-full rounded-[30px] bg-gradient-to-r from-[#70DD4A] to-[#FFFFFF] border-none text-black font-bold text-lg px-4"
              />
              <input
                type="submit"
                value="S'inscrire"
                className="bg-blue-500 border-none text-black font-bold cursor-pointer hidden"
              />
            </form>
          </div>

          <div className="h-full ml-2 lg:flex items-center form-arrow mt-6 2xl:hidden border-none">
            <img
              src="../../public/img/shape.png"
              alt="fleche"
              className="h-1/2 w-full object-cover"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

// Exportation du composant Footer pour l'utiliser dans d'autres parties de l'application
export default Footer;
