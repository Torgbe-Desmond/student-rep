import React, { useEffect, useRef, useState } from 'react';
import './VideoCard.css';
import VideoHeader from '../VideoHeader/VideoHeader';
import VideoFooter from '../VideoFooter/VideoFooter';
import CircularProgress from '@mui/material/CircularProgress';
import AutoplayVideo from '../AutoplayVideo/AutoplayVideo';

function VideoCard({ url, id,fileName, handleToggleDialog, selectedFiles }) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [isVideoBuffering, setIsVideoBuffering] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0); // Current time of video
  const [duration, setDuration] = useState(0); // Duration of the video

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // Loading state handlers
    const handleWaiting = () => {
      setIsVideoBuffering(true);
    };

    const handleCanPlay = () => {
      setIsVideoLoading(false);
      setIsVideoBuffering(false);
    };

    const handleLoadStart = () => {
      setIsVideoLoading(true);
    };

    const handleLoadedMetadata = () => {
      setIsVideoLoading(false);
      setDuration(videoElement.duration); // Get video duration
    };

    // Update current time of video
    const handleTimeUpdate = () => {
      setCurrentTime(videoElement.currentTime);
    };

    // Safe play method to handle autoplay restrictions
    const safePlay = async () => {
      try {
        await videoElement.play();
        setIsVideoPlaying(true);
      } catch (error) {
        console.log('Autoplay was prevented', error);
        setIsVideoPlaying(false);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (videoElement) {
              safePlay();
            }
          } else {
            if (videoElement) {
              videoElement.pause();
              setIsVideoPlaying(false);
            }
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '0px'
      }
    );

    // Add event listeners
    videoElement.addEventListener('waiting', handleWaiting);
    videoElement.addEventListener('canplay', handleCanPlay);
    videoElement.addEventListener('loadstart', handleLoadStart);
    videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    videoElement.addEventListener('timeupdate', handleTimeUpdate); // Update current time

    if (videoElement) {
      observer.observe(videoElement);
    }

    // Cleanup
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('waiting', handleWaiting);
        videoElement.removeEventListener('canplay', handleCanPlay);
        videoElement.removeEventListener('loadstart', handleLoadStart);
        videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
        observer.unobserve(videoElement);
      }
    };
  }, []);

  const onVideoPress = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    try {
      if (isVideoPlaying) {
        videoElement.pause();
        setIsVideoPlaying(false);
      } else {
        videoElement.play();
        setIsVideoPlaying(true);
      }
    } catch (error) {
      console.log('Error playing/pausing video', error);
      setIsVideoPlaying(false);
    }
  };

  const toggleMute = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const renderLoadingIndicator = () => {
    if (isVideoLoading || isVideoBuffering) {
      return (
        <div className='video-loading'>
          <CircularProgress size={75} color="inherit" />
        </div>
      );
    }
    return null;
  };

  console.log('isMuted',isMuted)

  const videoProgress = (currentTime / duration) * 100;

  return (
    <div className={`videoCard is-stuckToBottom`}>
      <VideoHeader
        toggleMute={toggleMute}
        isMuted={isMuted}
        fileName={fileName}
        handleToggleDialog={handleToggleDialog}
      />

      {renderLoadingIndicator()}
        <AutoplayVideo
          videoRef={videoRef}
          onVideoPress={onVideoPress}
          url={url}
          isMuted={isMuted}
          isVideoPlaying={isVideoPlaying}
        />


      <div className="video-progress-bar">
        <div
          className="progress"
          style={{ width: `${videoProgress}%` }}
        />
      </div>
      
    </div>
  );
}

export default VideoCard;
