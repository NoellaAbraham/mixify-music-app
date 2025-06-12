import React from 'react';

function SongCard({ title, artist, image, duration, description, isSelected, onSelect }) {
  return (
    <div className={`song-card ${isSelected ? 'selected' : ''}`} onClick={onSelect}>
      <img src={image} alt={title} className="song-image" />
      <h3>{title}</h3>
      <p>{artist}</p>
      <p>{description}</p>
      <p>{duration}</p>
    </div>
  );
}

export default SongCard;
