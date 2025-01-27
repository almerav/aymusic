import React, { useState } from "react";
import "../styles/FooterPlayer.scss";

const FooterPlayer = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo = {}, // Ensure songInfo is always defined
  setSongInfo,
  songs,
  setCurrentSong,
}) => {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false); // State for showing volume slider
  const [volume, setVolume] = useState(1); // Default volume is 100%

  // Play/pause handler
  const playPauseHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSliderChange = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setSongInfo({ ...songInfo, currentTime: newTime });
  };

  const skipTrackHandler = (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "next") {
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    } else if (direction === "prev") {
      setCurrentSong(
        songs[(currentIndex - 1 + songs.length) % songs.length]
      );
    }
  };

  const getSliderStyle = () => {
    const percentage = (songInfo.currentTime / songInfo.duration) * 100 || 0;
    return {
      background: `linear-gradient(to right, white ${percentage}%, #666 ${percentage}%)`,
    };
  };

  // Toggle the volume slider visibility
  const handleVolumeToggle = () => {
    setShowVolumeSlider((prevState) => !prevState);
  };

  // Volume change handler
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value); // Get slider value
    setVolume(newVolume); // Update volume state
    if (audioRef.current) {
      audioRef.current.volume = newVolume; // Update audio element volume
    }
  };

  // Dynamic volume slider background
  const getVolumeSliderStyle = () => {
    const percentage = volume * 100;
    return {
      background: `linear-gradient(to right, white ${percentage}%, #666 ${percentage}%)`,
    };
  };

  return (
    <div className="footer-player">
      {/* Left Section */}
      <div className="left-section">
        <img
          src={currentSong?.image || "/default-image.png"}
          alt={currentSong?.name || "No song"}
          className="song-image"
        />
        <div className="song-info">
          <p className="song-name">{currentSong?.name || "No song playing"}</p>
          <p className="song-artist">{currentSong?.artist || "Unknown artist"}</p>
        </div>
      </div>

      {/* Center Section */}
      <div className="center-section">
        <button onClick={() => skipTrackHandler("prev")} className="control-btn">⏮</button>
        <button className="control-btn play-pause" onClick={playPauseHandler}>
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button onClick={() => skipTrackHandler("next")} className="control-btn">⏭</button>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <div className="progress-bar">
          <span className="time">{formatTime(songInfo.currentTime)}</span>
          <input
            type="range"
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime || 0}
            style={getSliderStyle()}
            onChange={handleSliderChange}
          />
          <span className="time">{formatTime(songInfo.duration)}</span>
        </div>
        <div className="volume-control">
          <button className="volume-button" onClick={handleVolumeToggle}>
            🔊
          </button>
          {showVolumeSlider && (
            <div className="volume-slider-container">
              <input
                type="range"
                className="volume-slider"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolumeChange}
                style={getVolumeSliderStyle()}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function to format time in minutes:seconds
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

export default FooterPlayer;
