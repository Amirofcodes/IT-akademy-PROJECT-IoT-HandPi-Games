import React from 'react';
import PropTypes from 'prop-types';

const GameCard = ({ image, title, description, buttonText }) => {
  return (
    <div className="flex flex-col bg-gradient-to-b from-[#433D60] to-[#211E2E] rounded-xl overflow-hidden shadow-lg h-full">
      <div className="flex-grow flex flex-col items-center p-6 text-center">
        <img src={image} alt={title} className="w-[190px] h-[190px] object-cover rounded-full mb-4" />
        <h3 className="text-xl font-bold text-white mb-2 h-14 flex items-center">{title}</h3>
        <p className="text-gray-300 mb-4 flex-grow">{description}</p>
        <button 
          className="bg-button-gradient hover:bg-green-700 text-black font-bold py-3 px-10 rounded-full relative transition duration-300 mt-auto"
          onClick={() => console.log(`Clicked on ${title}`)}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

GameCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default GameCard;