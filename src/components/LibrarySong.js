import React from "react";
import Wave from "./Wave";

const LibrarySong = ({
  setSongs,
  songs,
  isPlaying,
  setIsPlaying,
  song,
  setCurrentSong,
  audioRef,
}) => {
  const { id } = song;

  const songSelecHandler = async () => {
    await setCurrentSong(song);
    await setIsPlaying(true);
    audioRef.current.play();

    const newSongs = songs.map((song) => {
      if (song.id === id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div
      onClick={songSelecHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt={song.name}></img>
      <div className='song-description'>
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
      {isPlaying && song.active && <Wave />}
    </div>
  );
};

export default LibrarySong;
