import React, { useEffect, useRef, useState } from 'react';
import {
  AppBar,
  Dialog,
  IconButton,
  List,
  Slide,
  Toolbar,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBottomTab } from '../../Features/PathSlice';
import CircularProgress from '@mui/material/CircularProgress';
import './Settings.css';
import AutoplayVideo from '../../components/AutoplayVideo/AutoplayVideo';
import VideoHeader from '../../components/VideoHeader/VideoHeader';
import Footer from '../../components/Footer/Footer';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Settings = () => {
  const open = useSelector((state) => state.path.bottomTab);
  const { selectedFolders: selectedFolderList, folders } = useSelector(
    (state) => state.work
  );
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.darkMode);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [isVideoBuffering, setIsVideoBuffering] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const videoRefs = useRef([]); // Store multiple refs for videos

  useEffect(() => {
    const handleLoadedMetadata = (index) => {
      const videoElement = videoRefs.current[index];
      if (videoElement) {
        setDuration(videoElement.duration);
        setIsVideoLoading(false);
      }
    };

    const handleWaiting = () => setIsVideoBuffering(true);
    const handleCanPlay = () => setIsVideoBuffering(false);
    const handleTimeUpdate = (index) => {
      const videoElement = videoRefs.current[index];
      if (videoElement) {
        setCurrentTime(videoElement.currentTime);
      }
    };

    selectedFiles.forEach((file, index) => {
      const videoElement = videoRefs.current[index];
      if (!videoElement) return;

      videoElement.addEventListener('loadedmetadata', () => handleLoadedMetadata(index));
      videoElement.addEventListener('waiting', handleWaiting);
      videoElement.addEventListener('canplay', handleCanPlay);
      videoElement.addEventListener('timeupdate', () => handleTimeUpdate(index));
    });

    return () => {
      selectedFiles.forEach((_, index) => {
        const videoElement = videoRefs.current[index];
        if (!videoElement) return;

        videoElement.removeEventListener('loadedmetadata', () => handleLoadedMetadata(index));
        videoElement.removeEventListener('waiting', handleWaiting);
        videoElement.removeEventListener('canplay', handleCanPlay);
        videoElement.removeEventListener('timeupdate', () => handleTimeUpdate(index));
      });
    };
  }, [selectedFiles]);

  const safePlay = (index) => {
    const videoElement = videoRefs.current[index];
    if (!videoElement) return;
    try {
      videoElement.play();
      setIsVideoPlaying(true);
    } catch (error) {
      console.error('Error playing video:', error);
      setIsVideoPlaying(false);
    }
  };

  const onVideoPress = (index) => {
    const videoElement = videoRefs.current[index];
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
      console.error('Error playing/pausing video:', error);
      setIsVideoPlaying(false);
    }
  };

  const seekVideo = (index, time) => {
    const videoElement = videoRefs.current[index];
    if (videoElement) {
      videoElement.currentTime = time;
      setCurrentTime(time);
      safePlay(index);
    }
  };

  const toggleMute = () => {
    videoRefs.current.forEach((videoElement) => {
      if (videoElement) {
        videoElement.muted = !isMuted;
      }
    });
    setIsMuted(!isMuted);
  };

  const filterFiles = () => {
    return folders
      ?.filter(
        (file) =>
          selectedFolderList.includes(file._id) &&
          file.mimetype !== 'Folder' &&
          file.mimetype !== 'Subscriptions' &&
          file.mimetype !== 'Shared'
      )
      .map((file) => file);
  };

  useEffect(() => {
    const files = filterFiles();
    setSelectedFiles(files || []);

    return () => {
      setSelectedFiles([]);
    };
  }, [folders, selectedFolderList]);

  const handleToggleDialog = () => {
    dispatch(toggleBottomTab());
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleToggleDialog}
      TransitionComponent={Transition}
      sx={{ backgroundColor: isDarkMode ? '#444' : '#2196f3' }}
      className="dialog-wrapper"
    >
      <List
        sx={{ backgroundColor: isDarkMode ? '#000' : '#000', overflowY: 'auto' }}
        className="list-container"
      >
        {selectedFiles.map((file, index) => (
          <div key={file._id} className="file-item">
            <VideoHeader
              toggleMute={toggleMute}
              isMuted={isMuted}
              handleToggleDialog={handleToggleDialog}
              selectedFiles={selectedFiles}
              mimetype={file.mimetype}
            />
            {file.mimetype.startsWith('video') && (
              <div className="video-player">
                <AutoplayVideo
                  index={index}
                  videoRef={(el) => (videoRefs.current[index] = el)}
                  onVideoPress={() => onVideoPress(index)}
                  url={file.url}
                  isMuted={isMuted}
                  isVideoPlaying={isVideoPlaying}
                  currentTime={currentTime} 
                  duration={duration}
                  seekVideo={seekVideo}
                />
        
                {(isVideoLoading || isVideoBuffering) && (
                  <div className="video-loading">
                    <CircularProgress size={75} color="inherit" />
                  </div>
                )}
               
              </div>
            )}
            {file.mimetype.startsWith('image') && (
              <div className="image-holder">
                <img
                  src={file.url}
                  alt={`Selected file`}
                  className="image-item"
                />
              </div>
            )}
          </div>
        ))}
      </List>
    </Dialog>
  );
};

export default Settings;
