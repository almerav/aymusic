import React, { useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Player from "./components/PlayerSong";
import Nav from "./components/Navb";
import Explore from "./components/Explore";
import Library from "./components/Library";
import FooterPlayer from "./components/FooterPlayer";
import "./styles/app.scss";

function App() {
  const location = useLocation();
  const [songs] = useState([
    {
      id: "1",
      name: "You Belong With Me",
      artist: "Taylor Swift",
      audio: "/audio/test.mp3",
      image: "/img/taylor.jpg",
      duration: "3:48",
    },
    {
      id: "2",
      name: "Shape of You",
      artist: "Ed Sheeran",
      audio: "/audio/ey.mp3",
      image: "/img/shape_of_you.png",
      duration: "4:23",
    },
    {
      id: "3",
      name: "Love Story",
      artist: "Taylor Swift",
      audio: "/audio/ey.mp3",
      image: "/img/taylor.jpg",
      duration: "3:55",
    },
  ]);

  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  const audioRef = useRef(null);

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration });
  };

  const songEndHandler = () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    let nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);

    if (isPlaying) {
      setTimeout(() => {
        audioRef.current.play();
      }, 0);
    }
  };

  return (
    <div className="app">
      <Nav />
      <div className="content">
        <header className="search-bar">
          <input
            type="text"
            placeholder=" ⌕ Search songs, albums, artists, podcasts"
          />
        </header>
        <Routes>
          <Route
            path="/"
            element={
              <Player
                currentSong={currentSong}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                audioRef={audioRef}
                songInfo={songInfo}
                setSongInfo={setSongInfo}
                songs={songs}
                setCurrentSong={setCurrentSong}
              />
            }
          />
          <Route
            path="/explore"
            element={
              <Explore
                songs={songs}
                setCurrentSong={setCurrentSong}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                audioRef={audioRef}
                songInfo={songInfo}
                setSongInfo={setSongInfo}
              />}
          />
          <Route
            path="/library"
            element={
              <Library
                songs={songs}
                currentSong={currentSong}
                setCurrentSong={setCurrentSong}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                audioRef={audioRef}
              />
            }
          />
        </Routes>
        <audio
          ref={audioRef}
          src={currentSong.audio}
          onTimeUpdate={timeUpdateHandler}
          onLoadedMetadata={(e) =>
            setSongInfo({ ...songInfo, duration: e.target.duration })
          }
          onEnded={songEndHandler}
        ></audio>
      </div>
      {location.pathname !== "/" && (
        <FooterPlayer
          currentSong={currentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          audioRef={audioRef}
          songInfo={songInfo}
          setSongInfo={setSongInfo}
          songs={songs}
          setCurrentSong={setCurrentSong}
        />

      )}
    </div>
  );
}

export default App;

