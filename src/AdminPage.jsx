import React, { useState } from 'react';
import SongCard from './SongCard';

function AdminPage({ songs, setSongs }) {
  const [newSong, setNewSong] = useState({
    title: '',
    artist: '',
    album: '',
    description: '',
    image: null,
    duration: '',
  });
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); // Tracks delete mode
  const [selectedToDelete, setSelectedToDelete] = useState([]); // Stores selected songs for deletion

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSong((prevSong) => ({
      ...prevSong,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setNewSong((prevSong) => ({
      ...prevSong,
      image: e.target.files[0],
    }));
  };

  const handleAddSong = (e) => {
    e.preventDefault();
    const songToAdd = {
      ...newSong,
      id: songs.length + 1,
      image: URL.createObjectURL(newSong.image),
    };
    setSongs((prevSongs) => [...prevSongs, songToAdd]);
    setNewSong({
      title: '',
      artist: '',
      album: '',
      description: '',
      image: null,
      duration: '',
    });
    setIsAdding(false); // Close the form after adding the song
  };

  // Function to reset form fields using onReset
  const handleReset = () => {
    setNewSong({
      title: '',
      artist: '',
      album: '',
      description: '',
      image: null,
      duration: '',
    });
  };

  // Toggles delete mode
  const toggleDeleteMode = () => {
    setIsDeleting(!isDeleting);
    setSelectedToDelete([]); // Clear the selection when toggling delete mode
  };

  // Toggle select/deselect for song
  const toggleSelectToDelete = (songId) => {
    setSelectedToDelete((prevSelected) =>
      prevSelected.includes(songId)
        ? prevSelected.filter((id) => id !== songId) // Deselect the item
        : [...prevSelected, songId] // Select the item
    );
  };

  // Delete selected songs
  const handleDeleteSongs = () => {
    setSongs((prevSongs) => prevSongs.filter((song) => !selectedToDelete.includes(song.id)));
    setSelectedToDelete([]); // Clear selection after deletion
    setIsDeleting(false); // Exit delete mode
  };

  return (
    <div className="admin-page">
      <h2>Admin Panel - Song Management</h2>
      <div className="actions">
        <button onClick={() => setIsAdding(!isAdding)}>Add Song</button>
        <button onClick={isDeleting ? handleDeleteSongs : toggleDeleteMode}>
          {isDeleting ? 'Confirm Delete' : 'Delete Items'}
        </button>
      </div>

      {isAdding ? (
        <form onSubmit={handleAddSong} className="add-song-form" onReset={handleReset}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newSong.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="artist"
            placeholder="Artist"
            value={newSong.artist}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="album"
            placeholder="Album"
            value={newSong.album}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newSong.description}
            onChange={handleChange}
          ></textarea>
          <input type="file" name="image" onChange={handleImageChange} accept="image/*" required />
          <input
            type="text"
            name="duration"
            placeholder="Duration (e.g., 3:30)"
            value={newSong.duration}
            onChange={handleChange}
          />
          <button type="submit">Add Song</button>
          <button type="reset">Reset</button> {/* This will trigger onReset handler */}
        </form>
      ) : (
        // Show the song list only if we are not adding a song
        <div className="song-list">
          {songs.map((song) => (
            <SongCard
              key={song.id}
              title={song.title}
              artist={song.artist}
              image={song.image}
              duration={song.duration}
              description={song.description}
              isSelected={isDeleting && selectedToDelete.includes(song.id)} // Highlight selected songs
              onSelect={() => isDeleting && toggleSelectToDelete(song.id)} // Toggle selection
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminPage;
