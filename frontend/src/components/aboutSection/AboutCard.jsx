import React from 'react';
import PropTypes from 'prop-types';

const AboutCard = ({ number, text }) => {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-48 h-48 rounded-full bg-number bg-opacity-80 flex items-center justify-center">
        <div className="w-[152px] h-[152px] rounded-full bg-gradient-to-r from-[#4DC423] to-[#70DC4A] flex items-center justify-center">
          <span className="text-5xl font-bold text-number-color">{number.padStart(2, '0')}</span>
        </div>
      </div>
      <div className="flex items-start space-x-2">
        <img src="/public/img/arrow-small.png" alt="Arrow" className="w-4 h-4 mt-2" />
        <p className="text-white text-2xl max-w-[188px] text-start">{text}</p>
      </div>
    </div>
  );
};

AboutCard.propTypes = {
  number: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default AboutCard;