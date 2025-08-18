import React, { useState, useEffect, useRef } from 'react';
import './ImageSlider.css';

const images = [
  {
    url: 'https://wallpaperaccess.com/full/1602656.jpg',
    caption: ['Need It Fast?', 'Rent It Now.'],
  },
  {
    url: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1600',
    caption: ['Smart Choices', 'Start Here.'],
  },
  {
    url: 'https://images.pexels.com/photos/274973/pexels-photo-274973.jpeg?auto=compress&cs=tinysrgb&w=1600',
    caption: ['Style, Speed &', 'Savings — All in One Place.'],
  },
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const captionRef = useRef(null);

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(autoSlide);
  }, []);

  useEffect(() => {
    const captionEl = captionRef.current;
    if (captionEl) {
      captionEl.classList.remove('typewriter');
      void captionEl.offsetWidth;
      captionEl.classList.add('typewriter');
    }
  }, [currentIndex]);

  const handleNext = () => setCurrentIndex((currentIndex + 1) % images.length);
  const handlePrev = () => setCurrentIndex((currentIndex - 1 + images.length) % images.length);

  return (
    <div className="slider-container">
      <button className="slider-btn left" onClick={handlePrev}>❮</button>

      {images.map((item, index) => (
        <div key={index} className={`slide ${index === currentIndex ? 'active' : ''}`}>
          <img src={item.url} alt={`slide-${index}`} className="slide-image" />
          {index === currentIndex && (
            <div ref={captionRef} className="slide-caption typewriter">
              <span className="white">{item.caption[0]} </span>
              <span className="blue">{item.caption[1]}</span>
            </div>
          )}
        </div>
      ))}

      <button className="slider-btn right" onClick={handleNext}>❯</button>
    </div>
  );
};

export default ImageSlider;
