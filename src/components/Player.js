import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
  faRandom,
  faSyncAlt,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  audioRef,
  isPlaying,
  setIsPlaying,
  setSongInfo,
  songInfo,
  songs,
  currentSong,
  setCurrentSong,
  setRondomSong,
  randomSong,
  activeLibraryHandler,
  libreryStatus,
  setLibreryStatus,
}) => {
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const skipTackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (randomSong) {
      const random = Math.floor(Math.random() * songs.length);
      await setCurrentSong(songs[random]);
      activeLibraryHandler(songs[random]);
    } else {
      if (direction === "skip-forward") {
        await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
      }
      if (direction === "skip-back") {
        if (currentIndex - 1 === -1) {
          await setCurrentSong(songs[songs.length - 1]);
          activeLibraryHandler(songs[songs.length - 1]);
          if (isPlaying) audioRef.current.play();
          return;
        } else {
          await setCurrentSong(songs[currentIndex - 1]);
          activeLibraryHandler(songs[currentIndex - 1]);
        }
      }
    }
    if (isPlaying) audioRef.current.play();
  };

  const Shuffle = () => {
    setRondomSong((prevState) => !prevState);
  };

  return (
    <div className='player-container'>
      <div className='player'>
        <div className='play-control'>
          <div className='icon-container'>
            <FontAwesomeIcon
              color='#D7D7D7'
              icon={randomSong ? faRandom : faSyncAlt}
              onClick={Shuffle}
            />
          </div>
          <FontAwesomeIcon
            onClick={() => skipTackHandler("skip-back")}
            className='skip-back'
            color='#D7D7D7'
            size='2x'
            icon={faAngleLeft}
          />
          <div className='play-pause' onClick={playSongHandler}>
            <FontAwesomeIcon
              className='play'
              color=' #fff'
              icon={isPlaying ? faPause : faPlay}
            />
          </div>
          <FontAwesomeIcon
            onClick={() => skipTackHandler("skip-forward")}
            className='skip-forward'
            color='#D7D7D7'
            size='2x'
            icon={faAngleRight}
          />
          <div
            className='icon-container'
            onClick={() => setLibreryStatus(!libreryStatus)}
          >
            <FontAwesomeIcon icon={faBars} color='#D7D7D7' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
