// LoadingScreen.jsx
import React from 'react';
import './index.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="waveform">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <p className="loading-text">Loading... Please Wait</p>
    </div>
  );
};

export default LoadingScreen;
