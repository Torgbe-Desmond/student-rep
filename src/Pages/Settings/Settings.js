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

    return ()=>{
      setSelectedFiles([])
      setCurrentPage(0)
    }
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
    sx={{backgroundColor: isDarkMode ? '#444' : '#2196f3',}}
    className="dialog-wrapper"
  >
    <AppBar 
    sx={{backgroundColor: isDarkMode ? '#444' : '#2196f3',}}
    className="app-bar">
      <Toolbar className="toolbar">
        <Typography variant="h6">
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
    sx={{backgroundColor: isDarkMode ? '#000' : '#000',}}
    className="list-container">
      {selectedFiles.length > 0 && (
        <>
          {selectedFiles[currentPage]?.mimetype.startsWith('video') && (
            <video
              src={selectedFiles[currentPage].url}
              controls
              className="video-player"
            />
          )}
  
          {selectedFiles[currentPage]?.mimetype.startsWith('image') && (
            <img
              src={selectedFiles[currentPage].url}
              alt={`Selected file ${currentPage}`}
              className="image-item"
            />
          )}
        </>
      )}
    </List>
    <div className="responsive-box">
      <ArrowBackIosNewIcon
        size={24}
        onClick={prevPage}
        color="primary"
        disabled={currentPage === 0}
      />
  
      <Typography variant="body1">
        {currentPage + 1} / {selectedFiles.length}
      </Typography>
  
      <ArrowForwardIosIcon
        size={24}
        onClick={nextPage}
        color="primary"
        disabled={currentPage === selectedFiles.length - 1}
      />
    </div>
  </Dialog>
  
  );
};

export default Settings;
