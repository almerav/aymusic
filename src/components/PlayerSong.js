import React from "react";
import "../styles/player.scss";

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  songs,
  setCurrentSong,
}) => {
  const playPauseHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
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

  const handleSliderChange = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setSongInfo({ ...songInfo, currentTime: newTime });
  };

  const getSliderStyle = () => {
    const percentage = (songInfo.currentTime / songInfo.duration) * 100 || 0;
    return {
      background: `linear-gradient(to right, white ${percentage}%, #666 ${percentage}%)`,
    };
  };

  return (
    <div className="player-card">
      <div className="song-details">
        <h3>{currentSong.name}</h3>
        <p>{currentSong.artist}</p>
      </div>
      <div className="cover">
        <img
          src={currentSong.image}
          alt={currentSong.name}
          className="cover-image"
        />
      </div>
      <div className="controls">
        <button
          onClick={() => skipTrackHandler("prev")}
          className="control-btn"
        >
          ⏮
        </button>
        <button onClick={playPauseHandler} className="control-btn play-btn">
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button
          onClick={() => skipTrackHandler("next")}
          className="control-btn"
        >
          ⏭
        </button>
      </div>
      <div className="time-control">
        <p>
          {Math.floor(songInfo.currentTime / 60) +
            ":" +
            ("0" + Math.floor(songInfo.currentTime % 60)).slice(-2)}
        </p>
        <input
          type="range"
          min="0"
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={handleSliderChange}
          style={getSliderStyle()} // Apply dynamic slider style
        />
        <p>
          {Math.floor(songInfo.duration / 60) +
            ":" +
            ("0" + Math.floor(songInfo.duration % 60)).slice(-2)}
        </p>
      </div>
    </div>
  );
};

export default Player;
