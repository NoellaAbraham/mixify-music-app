// App.jsx
import React, { useState } from 'react';
import Discover from './Discover';
import MySongs from './MySongs';
import Podcasts from './Podcasts';
import AdminPage from './AdminPage';
import Footer from './Footer';
import Slideshow from './Slideshow';
import LoginPage from './LoginPage';
import './index.css';
import LoadingScreen from './LoadingScreen';
import MouseTrail from './MouseTrail';

import logos from './assets/logo.png';
import redvelvet from './assets/redvelvet.jpg';
import iu from './assets/IU.jpg';
import baekhyun from './assets/baekhyung.jpg';
import alec from './assets/alec.jpg';
import aespa from './assets/aespa.jpg';
import nf from './assets/nf.jpg';

function App() {
  const [view, setView] = useState('login'); // Start with login view
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedSongId, setSelectedSongId] = useState(null);
  const [filter, setFilter] = useState('all');
  

  const slides = [redvelvet, iu, baekhyun, alec, aespa, nf];

  const [Songs, setSongs] = useState([
    { id: 1, title: 'Bad Boy', artist: 'Red Velvet', album: 'The Perfect Red Velvet - 2nd Album Repackage', description: '» 0:58 ─〇───── 3:16 «', image: redvelvet, duration: '3:30' },
    { id: 2, title: 'eight (Prod.&.Feat. Suga of BTS)', artist: 'IU', album: 'eight', description: '» 0:58 ─〇───── 3:16 «', image: iu, duration: '2:47' },
    { id: 3, title: 'Pineapple Slice', artist: 'Baekhyun', album: 'Summer Skies', description: '» 0:58 ─〇───── 3:16 «', image: baekhyun, duration: '3:15' },
    { id: 4, title: 'Boy in The Bubble', artist: 'Alec Benjamin', album: 'Album Four', description: '» 0:58 ─〇───── 3:16 «', image: alec, duration: '3:01' },
    { id: 5, title: 'Armageddon', artist: 'Aespa', album: 'Album Five', description: '» 0:58 ─〇───── 3:16 «', image: aespa, duration: '3:01' },
    { id: 6, title: 'The Lost', artist: 'NF', album: 'Album Six', description: '» 0:58 ─〇───── 3:16 «', image: nf, duration: '3:01' },
  ]);

  const handleLogin = (newView, adminStatus) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setView(newView);
      setIsAdmin(adminStatus);
    }, 1500);
  };

  const updateSongStatus = (songId, status) => {
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.id === songId ? { ...song, status } : song
      )
    );
  };

  const handleToggleSong = (songId) => {
    setSelectedSongId((prevId) => (prevId === songId ? null : songId));
  };

  const renderView = () => {
    switch (view) {
      case 'discover':
        return (
          <Discover
            songs={Songs.filter((song) =>
              filter === 'all' ? true : song.status === filter
            )}
            selectedSongId={selectedSongId}
            onSelectSong={handleToggleSong}
            filter={filter}
            filterSongs={setFilter}
          />
        );
      case 'mine':
        return (
          <MySongs
            songs={Songs.filter((song) =>
              filter === 'all' ? true : song.status === filter
            )}
            selectedSongId={selectedSongId}
            onSelectSong={handleToggleSong}
            filter={filter}
            filterSongs={setFilter}
          />
        );
      case 'podcasts':
        return <Podcasts />;
      case 'admin':
        return isAdmin ? <AdminPage songs={Songs} setSongs={setSongs} /> : <p>Access denied</p>;
      default:
        return <Discover />;
    }
  };

  const renderSidebarButtons = () => {
    if (isAdmin) {
      return (
        <>
          <button onClick={() => setView('admin')}>Songs Management</button>
          <button onClick={() => setView('podcasts')}>Podcasts Management</button>
          <button onClick={() => handleLogin('login', false)}>Logout</button>
        </>
      );
    } else {
      return (
        <>
          <button onClick={() => setView('discover')}>Discover</button>
          <button onClick={() => setView('mine')}>My Songs</button>
          <button onClick={() => setView('podcasts')}>Podcasts</button>
          <button onClick={() => handleLogin('login', false)}>Logout</button>
        </>
      );
    }
  };

  if (loading) {
    return <LoadingScreen />;  // Display the new loading screen
  }

  if (view === 'login') {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <div className="sidebar">
        <img src={logos} alt="App Logo" className="app-logo" />
        {renderSidebarButtons()}
      </div>

      <div className="middle-section">{renderView()}</div>

      <div className="right-sidebar">
        {!selectedSongId ? (
          <Slideshow slides={slides} />
        ) : (
          <div className="song-details">
            {Songs.filter((song) => song.id === selectedSongId).map((song) => (
              <div key={song.id} className="song-details-content">
                <img src={song.image} alt={song.title} className="album-cover" />
                <h2>{song.title} - {song.artist}</h2>
                <h3>{song.album}</h3>
                <p>{song.description}</p>

                <div className="reaction-buttons">
                  <button onClick={() => updateSongStatus(song.id, 'disliked')}>👎</button>
                  <button onClick={() => updateSongStatus(song.id, 'liked')}>👍</button>
                  <button onClick={() => updateSongStatus(song.id, 'loved')}>❤️</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
      <MouseTrail />
     
    </div>
  );
}

export default App;
