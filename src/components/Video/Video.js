import React, { useEffect, useRef, useState } from 'react';
import AutoplayVideo from '../../components/AutoplayVideo/AutoplayVideo';
import CircularProgress from '@mui/material/CircularProgress';
import { List } from '@mui/material';
import { useSelector } from 'react-redux';

const Video = ({ file }) => {
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [isVideoBuffering, setIsVideoBuffering] = useState(false);
  const [videoState, setVideoState] = useState({
    currentTime: 0,
    duration: 0,
  });
  const [isMuted, setIsMuted] = useState(true);
  const isDarkMode = useSelector((state) => state.theme.darkMode);


  useEffect(() => {
    const videoElement = videoRef.current;

    const handleLoadedMetadata = () => {
      setVideoState((prevState) => ({
        ...prevState,
        duration: videoElement.duration,
      }));
    };

    const handleTimeUpdate = () => {
      setVideoState((prevState) => ({
        ...prevState,
        currentTime: videoElement.currentTime,
      }));
    };

    const handleWaiting = () => setIsVideoBuffering(true);
    const handleCanPlay = () => setIsVideoBuffering(false);

    videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    videoElement.addEventListener('timeupdate', handleTimeUpdate);
    videoElement.addEventListener('waiting', handleWaiting);
    videoElement.addEventListener('canplay', handleCanPlay);

    return () => {
      videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      videoElement.removeEventListener('waiting', handleWaiting);
      videoElement.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  const togglePlayPause = () => {
    const videoElement = videoRef.current;
    if (isVideoPlaying) {
      videoElement.pause();
    } else {
      videoElement.play();
    }
    setIsVideoPlaying(!isVideoPlaying);
  };

  const toggleMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const seekVideo = (time) => {
    videoRef.current.currentTime = time;
    setVideoState((prevState) => ({
      ...prevState,
      currentTime: time,
    }));
  };

 
  return (
    <List
    sx={{
      backgroundColor: isDarkMode ? '#444' : '#000',
      overflowY: 'auto',
     }}
    className="list-container"
  >
    <div className="video-player">
        <AutoplayVideo
          videoRef={videoRef}
          onVideoPress={togglePlayPause}
          url={file.url}
          isMuted={isMuted}
          isVideoPlaying={isVideoPlaying}
          currentTime={videoState.currentTime}
          duration={videoState.duration}
          seekVideo={seekVideo}
        />
     {(isVideoLoading || isVideoBuffering) && (
       <div className="video-loading">
         <CircularProgress size={75} color="inherit" />
       </div>
     )}
     </div>
  
  </List>
  );
};

export default Video;

