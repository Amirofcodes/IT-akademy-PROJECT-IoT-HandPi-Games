import React, { useState, useEffect } from 'react';

const ImageSlider = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "/public/img/slider-1.png",
    "/public/img/slider-2.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-[4/3] sm:aspect-[16/16] lg:aspect-[21/19]">
      <div className="absolute inset-0 rounded-tr-[100px] rounded-bl-[100px] transform rotate-3"></div>
      <div className="absolute inset-2 overflow-hidden rounded-tr-[90px] rounded-bl-[80px]">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Sign Language Example ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;