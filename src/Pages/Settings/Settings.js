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
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBottomTab } from '../../Features/PathSlice';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
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
              ? `${selectedFiles.length} items selected`
              : 'No files selected'}
          </Typography>

          <IconButton edge="start" color="inherit" onClick={handleToggleDialog}>
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <List
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

      {/* Vertical Navigation with Icons on Right Side */}
      <div
        style={{
          position: 'fixed',
          top:'50%',
          right: 10,
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: '#FFF',
          padding: '10px 10px',
          borderRadius:'44px',
          marginRight:'5px',
          boxShadow:'0 10 5px rgba(161, 167, 204, 0.5)'
        }}
      >
        <ArrowBackIosNewIcon
          size={24}
          onClick={prevPage}
          color="primary"
          disabled={currentPage === 0}
          sx={{ marginBottom: '10px' }}
        />

        <Typography variant="body1" sx={{ marginBottom: '10px' }}>
          {currentPage + 1} / {selectedFiles.length}
        </Typography>

        <ArrowForwardIosIcon
          size={24}
          sx={{ marginBottom: '10px' }}
          color="primary"
          disabled={currentPage === selectedFiles.length - 1}
          onClick={nextPage}
        />
      </div>
    </Dialog>
  );
};

export default Settings;
