import React, { useState } from 'react';
import SongCard from './SongCard';


function Discover({ songs, selectedSongId, onSelectSong, filter, filterSongs }) {
  return (
    <div>
      <h1>Discover</h1>
      <div className="filter-container">
        <label htmlFor="filter">Filter: </label>
        <select id="filter" value={filter} onChange={(e) => filterSongs(e.target.value)}>
          <option value="all">All</option>
          <option value="disliked">Disliked Songs</option>
          <option value="liked">Liked Songs</option>
          <option value="loved">Loved Songs</option>
        </select>
      </div>
      <div className="song-list">
        {songs.map((song) => (
          <SongCard
            key={song.id}
            title={song.title}
            artist={song.artist}
            image={song.image}
            duration={song.duration}
            description={song.description}
            isSelected={selectedSongId === song.id}
            onSelect={() => onSelectSong(song.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Discover;
