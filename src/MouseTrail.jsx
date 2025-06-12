// MouseTrail.jsx
import React, { useState, useEffect } from 'react';
import './index.css';

function MouseTrail() {
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Create a new trail element at the mouse position
      const newTrailElement = {
        id: Math.random(), // Unique ID for each element
        x: event.clientX,
        y: event.clientY,
      };

      // Add the new element to the trail array
      setTrail((prevTrail) => [...prevTrail, newTrailElement]);
    };

    // Add the event listener for mouse movement
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Clean up old trail elements after a delay
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail((prevTrail) => prevTrail.slice(1)); // Remove the oldest element
    }, 50); // Adjust for faster/slower trail effect

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {trail.map((element) => (
        <div
          key={element.id}
          className="trail"
          style={{
            top: element.y + 'px',
            left: element.x + 'px',
          }}
        />
      ))}
    </div>
  );
}

export default MouseTrail;
