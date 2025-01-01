import React, { useEffect, useRef, useState } from "react";
import AutoplayVideo from "../../components/AutoplayVideo/AutoplayVideo";
import CircularProgress from "@mui/material/CircularProgress";
import { List } from "@mui/material";
import { useSelector } from "react-redux";
import VideoHeader from "../VideoHeader/VideoHeader";
import Footer from "../Footer/Footer";
import './Video.css'

const Video = ({ file, handleToggleDialog, selectedFiles, index }) => {
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
      setIsVideoLoading(false);
    };

    const handleTimeUpdate = () => {
      setVideoState((prevState) => ({
        ...prevState,
        currentTime: videoElement.currentTime,
      }));
    };

    const handleWaiting = () => setIsVideoBuffering(true);
    const handleCanPlay = () => setIsVideoBuffering(false);

    videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    videoElement.addEventListener("timeupdate", handleTimeUpdate);
    videoElement.addEventListener("waiting", handleWaiting);
    videoElement.addEventListener("canplay", handleCanPlay);

    return () => {
      videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      videoElement.removeEventListener("waiting", handleWaiting);
      videoElement.removeEventListener("canplay", handleCanPlay);
    };
  }, []);

  const togglePlayPause = async () => {
    const videoElement = videoRef.current;
    try {
      if (isVideoPlaying) {
        videoElement.pause();
      } else {
        await videoElement.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    } catch (error) {
      console.error("Error playing video:", error);
    }
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

  const pauseAllVideos = (currentRef) => {
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      if (video !== currentRef.current) {
        video.pause();
      }
    });
  };

  return (
    <List
      sx={{
        backgroundColor: isDarkMode ? "rgb(33,37,39)" : "#000",
        overflowY: "auto",
      }}
      className="list-container"
    >
      <VideoHeader
        toggleMute={toggleMute}
        isMuted={isMuted}
        handleToggleDialog={handleToggleDialog}
        selectedFiles={selectedFiles}
        file={file}
      />
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
          pauseAllVideos={pauseAllVideos}
        />
        {(isVideoLoading || isVideoBuffering) && (
          <div className="video-loading">
            <CircularProgress size={75} color="inherit" />
          </div>
        )}
      </div>
      <Footer
        currentTime={videoState.currentTime}
        duration={videoState.duration}
        seekVideo={seekVideo}
        index={index}
      />
    </List>
  );
};

export default Video;
