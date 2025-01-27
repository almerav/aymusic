import React from "react";
import "../styles/explore.scss";

const Explore = ({
  songs,
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
}) => {
  const mostFrequentArtist = songs.reduce((acc, song) => {
    acc[song.artist] = (acc[song.artist] || 0) + 1;
    return acc;
  }, {});

  const currentArtist = Object.keys(mostFrequentArtist).reduce((a, b) =>
    mostFrequentArtist[a] > mostFrequentArtist[b] ? a : b
  );

  // Filter songs by the most frequent artist
  const similarSongs = songs.filter((song) => song.artist === currentArtist);

  const playSongHandler = (song) => {
    setCurrentSong(song); // Update the current song

    if (audioRef.current) {
      audioRef.current.pause(); // Pause any currently playing song
      audioRef.current.src = song.audio; // Set the new audio source
      audioRef.current.load(); // Load the new song

      // Automatically play the new song after loading
      audioRef.current.onloadeddata = () => {
        audioRef.current.play();
        setIsPlaying(true); // Update the playback state
        setSongInfo({
          ...songInfo,
          currentTime: 0,
          duration: audioRef.current.duration,
        });
      };
    }
  };

  return (
    <div className="explore-container">
      <div className="explore-content">
        <section className="listen-again">
          <h2>Listen again</h2>
          <div className="song-grid">
            {songs.map((song) => (
              <div
                className="song-card"
                key={song.id}
                onClick={() => playSongHandler(song)} // Make song cards clickable
              >
                <img src={song.image} alt={song.name} />
                <p className="song-title">{song.name}</p>
                <p className="song-artist">{song.artist}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="similar-to">
          <h2>SIMILAR TO {currentArtist}</h2>
          <div className="song-grid">
            {similarSongs.length > 0 ? (
              similarSongs.map((song) => (
                <div
                  className="song-card"
                  key={song.id}
                  onClick={() => playSongHandler(song)} // Make song cards clickable
                >
                  <img src={song.image} alt={song.name} />
                  <p className="song-title">{song.name}</p>
                  <p className="song-artist">{song.artist}</p>
                </div>
              ))
            ) : (
              <p>No similar songs found</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;
