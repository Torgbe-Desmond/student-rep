import PlayArrowIcon from '@mui/icons-material/PlayArrow'; // Material UI Play Icon
import './AutoplayVideo.css';
import { useCallback, useState } from 'react';

const AutoplayVideo = ({currentTime, duration, index, videoRef, onVideoPress, url, isMuted, seekVideo, isVideoPlaying,pauseAllVideos}) => {
  console.log(url)

  const handleClick = useCallback(() => {
    pauseAllVideos(videoRef);
    onVideoPress();
  }, [videoRef, onVideoPress]);
  const [isLoading, setIsLoading] = useState(true);

const handleLoadedData = () => {
  setIsLoading(false);
};

return (
  <div className="video-container" onClick={handleClick}>
    <video
      ref={videoRef}
      type="video/mp4"
      className="video__player"
      src={url}
      alt="meme-me"
      loop
      muted={isMuted}
      playsInline
      preload="metadata"
      onLoadedData={handleLoadedData}
    />
    {!isVideoPlaying && !isLoading && (
      <div className="play-button-overlay">
        <PlayArrowIcon style={{ fontSize: 50, color: 'white' }} />
      </div>
    )}
  </div>
);

}

export default AutoplayVideo;
