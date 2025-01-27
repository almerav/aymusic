import React, { useState } from "react";
import "../styles/library.scss";


const Library = ({ songs, currentSong, setCurrentSong, isPlaying, setIsPlaying, audioRef }) => {
  const [activeSong, setActiveSong] = useState(null);

  const handlePlayPause = (song) => {
    if (activeSong !== song.id) {
      // Switch to the new song
      setActiveSong(song.id);
      setCurrentSong(song);

      if (audioRef.current) {
        audioRef.current.pause(); // Pause the current song
        audioRef.current.src = song.audio; // Update the audio source
        audioRef.current.load(); // Load the new song

        // Play the new song after it has been loaded
        audioRef.current.onloadeddata = () => {
          audioRef.current.play();
          setIsPlaying(true);
        };
      }
    } else {
      // Toggle play/pause for the same song
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Sort the songs alphabetically by name
  const sortedSongs = [...songs].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="library-container">
      <div className="library-content">
        <h2>Your Library</h2>
        <div className="song-list">
          {sortedSongs.map((song) => (
            <div
              className={`song-item ${activeSong === song.id ? "active-song" : ""}`}
              onClick={() => handlePlayPause(song)}
              key={song.id}
            >
              <img src={song.image} alt={song.name} className="song-image" />
              <div className="song-info">
                <p className="song-name">{song.name}</p>
                <p className="song-artist">{song.artist}</p>
                <p className="song-duration">{song.duration}</p>
              </div>
              <button
                className={`play-pause-btn ${activeSong === song.id && isPlaying ? "pause" : "play"}`}
                onClick={() => handlePlayPause(song)}
              >
                {activeSong === song.id && isPlaying ? "⏸" : "▶"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Library;
