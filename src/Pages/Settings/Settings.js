import React, { useEffect, useState } from 'react';
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
import './Settings.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Settings = () => {
  const open = useSelector((state) => state.path.bottomTab);
  const { selectedFolders: selectedFolderList, folders } = useSelector(
    (state) => state.work
  );
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Track current file page
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.darkMode);

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
  }, [folders, selectedFolderList]);

  const handleToggleDialog = () => {
    dispatch(toggleBottomTab());
  };

  const handleWheelScroll = (e) => {
    if (e.deltaY > 0) {
      nextPage();
    } else {
      prevPage();
    }
  };

  const nextPage = () => {
    if (currentPage < selectedFiles.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleToggleDialog}
      TransitionComponent={Transition}
      sx={{
        backgroundColor: isDarkMode ? '#333' : '#ffffff',
        height: '100%',
      }}
    >
      <AppBar
        sx={{
          position: 'relative',
          backgroundColor: isDarkMode ? '#444' : '#2196f3', // Dark mode AppBar color
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" sx={{ textAlign: 'flex-end' }}>
            {selectedFiles.length > 0
              ? `${currentPage} / ${ selectedFiles.length} items selected`
              : 'No files selected'}
          </Typography>

          <IconButton edge="start" color="inherit" onClick={handleToggleDialog}>
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <List
        onWheel={handleWheelScroll}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: isDarkMode ? '#333' : '#ffffff', // Set dark mode List background color
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {selectedFiles.length > 0 && (
          <>
            {selectedFiles[currentPage]?.mimetype.startsWith('video') && (
              <video
                src={selectedFiles[currentPage].url}
                controls
                style={{
                  maxWidth: '100%',
                  objectFit: 'contain',
                  margin: '20px 0px',
                }}
              />
            )}

            {selectedFiles[currentPage]?.mimetype.startsWith('image') && (
              <img
                src={selectedFiles[currentPage].url}
                alt={`Selected file ${currentPage}`}
                style={{
                  width: '100%',
                  objectFit: 'contain',
                  marginBottom: '10px',
                }}
              />
            )}
          </>
        )}
      </List>
    </Dialog>
  );
};

export default Settings;
