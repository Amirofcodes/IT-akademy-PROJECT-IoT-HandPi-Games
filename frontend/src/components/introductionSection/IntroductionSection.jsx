import React from 'react';
import PropTypes from 'prop-types';

const InfoSection = ({ mainTitle, subTitle, text, arrowImagePath }) => {
  return (
    <section className="flex flex-col md:flex-row items-start justify-between p-4 gap-8 md:p-8 max-w-7xl mx-auto bg-dark-blue text-white">
      <div className="flex flex-col items-start space-y-4 md:w-1/2 mb-6 md:mb-0">
        <h2 className="text-2xl md:text-4xl font-bold">{mainTitle}</h2>
        <div className="flex gap-4"><h3 className="text-xl md:text-2xl  text-light-blue">{subTitle}</h3>
        <img src={arrowImagePath} alt="Arrow" className="w-16 h-8  animate-blink" /></div>
        
      </div>
      <div className="md:w-1/2">
        <p className="text-base md:text-lg">{text}</p>
      </div>
    </section>
  );
};

InfoSection.propTypes = {
  mainTitle: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  arrowImagePath: PropTypes.string.isRequired,
};

export default InfoSection;