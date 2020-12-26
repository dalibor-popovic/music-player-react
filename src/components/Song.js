import Roundy from "roundy";
import useWindowSize from "../hooks/useWindowSize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Song = ({ currentSong, isPlaying, songInfo, setSongInfo, audioRef }) => {
  const size = useWindowSize();
  console.log(size.width);
  const dragHandlerRoundy = (value) => {
    audioRef.current.currentTime = value;
    setSongInfo({ ...songInfo, currentTime: value });
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const duration = isNaN(songInfo.duration) ? 0 : songInfo.duration;

  const currentSongTime = isNaN(songInfo.currentTime)
    ? 0
    : songInfo.currentTime;

  return (
    <div className='song-container'>
      {!!duration ? (
        <div className='song-display'>
          <div className='roundy-container'>
            <Roundy
              sliced={false}
              min={0}
              max={duration}
              value={currentSongTime}
              radius={size.width > 768 ? 170 : 150}
              color='#4da890'
              onChange={dragHandlerRoundy}
              allowClick
              strokeWidth={10}
            />
            {!!currentSong.cover && (
              <img
                className={!isPlaying ? "rotatePause" : "rotateStart"}
                src={currentSong.cover}
                alt={currentSong.name}
              />
            )}
          </div>
          <p style={{ position: "absolute", bottom: 0, left: 0 }}>
            {getTime(songInfo.currentTime)}
          </p>
          <p style={{ position: "absolute", bottom: 0, right: 0 }}>
            {getTime(songInfo.duration)}
          </p>
        </div>
      ) : (
        <div className='song-display'>
          <FontAwesomeIcon size='2x' icon={faSpinner} pulse />
        </div>
      )}

      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
};

export default Song;
