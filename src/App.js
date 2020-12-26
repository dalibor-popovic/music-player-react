import { useState, useRef } from "react";
import "./styles/app.scss";
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";

function App({ songs, setSongs }) {
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
    volume: 0.9,
  });
  const [libreryStatus, setLibreryStatus] = useState(false);
  const [randomSong, setRondomSong] = useState(false);

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //Calculate percentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animationPercentage = Math.round(
      (roundedCurrent / roundedDuration) * 100
    );

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPercentage,
    });
  };

  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((song) => {
      if (song.id === nextPrev.id) {
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
  };

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (randomSong) {
      const random = Math.floor(Math.random() * songs.length);
      await setCurrentSong(songs[random]);
      activeLibraryHandler(songs[random]);
    } else {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    }
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  const audioRef = useRef(null);

  return (
    <div className='App'>
      <div className='music-player'>
        <Song
          currentSong={currentSong}
          isPlaying={isPlaying}
          songInfo={songInfo}
          audioRef={audioRef}
          setSongInfo={setSongInfo}
        />
        <Player
          randomSong={randomSong}
          setRondomSong={setRondomSong}
          songs={songs}
          setSongs={setSongs}
          songInfo={songInfo}
          setSongInfo={setSongInfo}
          audioRef={audioRef}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          activeLibraryHandler={activeLibraryHandler}
          libreryStatus={libreryStatus}
          setLibreryStatus={setLibreryStatus}
        />
      </div>
      <Library
        libreryStatus={libreryStatus}
        setLibreryStatus={setLibreryStatus}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        onEnded={songEndHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
}

export default App;
