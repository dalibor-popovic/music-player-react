import React from "react";
import LibrarySong from "./LibrarySong";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Library = ({
  libreryStatus,
  setSongs,
  isPlaying,
  setIsPlaying,
  songs,
  setCurrentSong,
  audioRef,
  setLibreryStatus,
}) => {
  return (
    <div className={`library ${libreryStatus ? "active-library" : ""}`}>
      <div className='library-header'>
        <h2>Playlist</h2>
        <FontAwesomeIcon
          className='close'
          color='#ffffff'
          icon={faTimes}
          onClick={() => setLibreryStatus(false)}
        />
      </div>
      <div className='songs'>
        {songs.map((song) => (
          <LibrarySong
            setSongs={setSongs}
            songs={songs}
            song={song}
            key={song.id}
            setCurrentSong={setCurrentSong}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
