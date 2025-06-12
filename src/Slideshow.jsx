import React, { useState, useEffect } from 'react';
import './index.css'

function Slideshow({ slides }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatically change the slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);  // 5 seconds per slide
    return () => clearInterval(interval);  // Cleanup interval on component unmount
  }, [slides.length]);

  return (
    <div className="slideshow-section">
      <h1>Welcome to Mixify!</h1>
      <img src={slides[currentSlide]} alt="Slide" className="slide" />
    </div>
  );
}

export default Slideshow;
