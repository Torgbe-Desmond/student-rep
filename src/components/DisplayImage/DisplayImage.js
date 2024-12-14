import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Paper } from '@mui/material';
import Draggable from 'react-draggable';
import { useDispatch, useSelector } from 'react-redux';
import { handleStackClear } from '../HandleStack/HandleStack';
import './DisplayImage.css';
import CloseIcon from '@mui/icons-material/Close';
import AutoplayVideo from '../AutoplayVideo/AutoplayVideo';
import CircularProgress from '@mui/material/CircularProgress';

const DisplayImage = () => {
  const reference_Id = localStorage.getItem('reference_Id');
  const { selectedFolders: selectedFolderList, folders } = useSelector((state) => state.work);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filename, setFilename] = useState('');
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.darkMode);
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

  const filteredSelectedDataByMimetypeForOnlyFilesOrFolders = () => {
    const files = folders
      ?.filter(
        (file) =>
          selectedFolderList.includes(file._id) &&
          file.mimetype !== 'Folder' &&
          file.mimetype !== 'Subscriptions' &&
          file.mimetype !== 'Shared'
      )
      .map((file) => file);

    return {
      files
    };
  };

  useEffect(() => {
    const { files } = filteredSelectedDataByMimetypeForOnlyFilesOrFolders();
    console.log('files',files)
    setSelectedFiles(files || []);
    if (files?.length > 0) {
      const firstFile = files[0]; 
      if (firstFile?.name) setFilename(firstFile.name);
    } else {
      setFilename('');
    }
  }, [folders, selectedFolderList]);

  return (
    <Draggable
      cancel={'[class*="MuiDialogContent-root"]'}
      handle="#draggable-display-image-title"
    >
      <Paper
        elevation={3}
        sx={{
          position: 'relative',
          backgroundCcolor: '#FFF',
          borderRadius: '4px',
          width: '100%',
          height: '100%',
          maxWidth: '450px',
          margin: '0 auto',
          overflow: 'scroll',
          scrollSnapType: 'y mandatory',
          overscrollBehaviorY: 'contain', 
        }}
      >
        <Box className="display-image-overlay">
        <Box
  className="display-image-overlay"
  sx={{
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll',
    scrollSnapType: 'y mandatory', // Enables snap scrolling
    maxHeight: '100%',
    padding: '16px',
  }}
>
  <Box className={`display-image-container ${isDarkMode ? 'dark-mode-display' : ''}`}>
    <Box
      id="draggable-display-image-title"
      sx={{
        cursor: 'move',
        width: '300px',
        backgroundColor: isDarkMode ? 'dark-mode' : '',
        borderBottom: '1px solid #ddd',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Button
        variant="text"
        size="small"
        disabled={!isDarkMode}
        sx={{ color: isDarkMode ? '#FFF' : '' }}
      >
        {filename}
      </Button>

      <CloseIcon
        sx={{ color: 'red', cursor: 'pointer', m: 1 }}
        onClick={() => handleStackClear(dispatch)}
      />
    </Box>

    <Box className="videoCard" sx={{ scrollSnapType: 'y mandatory', scrollPadding: '16px' }}>
      {selectedFiles.map((file, index) => {
        if (file.mimetype.startsWith('video')) {
          return (
            <AutoplayVideo
              key={index}
              videoRef={videoRef}
              onVideoPress={onVideoPress}
              url={file.url}
              isMuted={isMuted}
              isVideoPlaying={isVideoPlaying}
              style={{ scrollSnapAlign: 'start' }} // Snap to the start of the viewport
            />
          );
        } else if (file.mimetype.startsWith('image')) {
          return (
            <img
              key={index}
              src={file.url}
              alt={`Selected file ${index}`}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                scrollSnapAlign: 'start', // Snap to the start of the viewport
              }}
            />
          );
        } else {
          return (
            <Button key={index} style={{ scrollSnapAlign: 'start' }}>
              No Media
            </Button>
          );
        }
      })}
    </Box>
  </Box>
</Box>

        </Box>
      </Paper>
    </Draggable>
  );
};

export default DisplayImage;
