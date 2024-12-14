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
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) return;

    const handleWaiting = () => setIsVideoBuffering(true);
    const handleCanPlay = () => {
      setIsVideoBuffering(false);
      setIsVideoLoading(false);
    };
    const handleLoadStart = () => setIsVideoLoading(true);
    const handleLoadedMetadata = () => {
      setDuration(videoElement.duration || 0);
      setIsVideoLoading(false);
    };
    const handleTimeUpdate = () => setCurrentTime(videoElement.currentTime);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          safePlay();
        } else {
          videoElement.pause();
          setIsVideoPlaying(false);
        }
      },
      { threshold: 0.5 }
    );

    videoElement.addEventListener('waiting', handleWaiting);
    videoElement.addEventListener('canplay', handleCanPlay);
    videoElement.addEventListener('loadstart', handleLoadStart);
    videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    videoElement.addEventListener('timeupdate', handleTimeUpdate);

    observer.observe(videoElement);

    return () => {
      videoElement.removeEventListener('waiting', handleWaiting);
      videoElement.removeEventListener('canplay', handleCanPlay);
      videoElement.removeEventListener('loadstart', handleLoadStart);
      videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      observer.disconnect();
    };
  }, []);

  const safePlay = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    try {
      videoElement.play();
      setIsVideoPlaying(true);
    } catch (error) {
      console.error('Error playing video:', error);
      setIsVideoPlaying(false);
    }
  };

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
      console.error('Error playing/pausing video:', error);
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

  const videoProgress = (currentTime / duration) * 100;

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleToggleDialog}
      TransitionComponent={Transition}
      sx={{ backgroundColor: isDarkMode ? '#444' : '#2196f3' }}
      className="dialog-wrapper"
    >
      <AppBar
        sx={{ backgroundColor:'transparent' }}
        className="app-bar"
      >
        <Toolbar className="toolbar">

          <Typography 
           sx={{ color: isDarkMode ? '#FFF' : '#000' }}
          variant="h6">
            {selectedFiles.length > 0
              ? `${selectedFiles.length} items selected`
              : 'No files selected'}
          </Typography>

          <IconButton 
          sx={{ color: isDarkMode ? '#FFF' : '#000' }}
          edge="start" color="inherit" onClick={handleToggleDialog}>
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <List
        sx={{ backgroundColor: isDarkMode ? '#000' : '#000', overflowY: 'auto' }}
        className="list-container"
      >
        {selectedFiles.map((file,index) => (
          <div key={file._id} className="file-item">
            {file.mimetype.startsWith('video') && (
              <div className="video-player">
                <AutoplayVideo
                  index={index}
                  videoRef={videoRef}
                  onVideoPress={onVideoPress}
                  url={file.url}
                  isMuted={isMuted}
                  isVideoPlaying={isVideoPlaying}
                />
                {(isVideoLoading || isVideoBuffering) && (
                  <div className="video-loading">
                    <CircularProgress size={75} color="inherit" />
                  </div>
                )}

                {/* <div className="video-progress-bar">
                 <div
                   className="progress"
                   style={{ width: `${videoProgress}%` }}
                 />
                </div> */}

                 
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
