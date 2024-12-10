import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Button,
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

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleToggleDialog}
      TransitionComponent={Transition}
      sx={{
        backgroundColor: isDarkMode ? '#333' : '#ffffff',
        height:'100%',
        '& .css-xbarva-MuiList-root':{
          height:'100%'
        }
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
          backgroundColor: isDarkMode ? '#333' : '#ffffff', // Set dark mode List background color
          padding: 2, // Adding some padding for better layout
        }}
      >
        {selectedFiles.map((file, index) => {
          if (file.mimetype.startsWith('video')) {
            return (
              <video
                key={index}
                src={file.url}
                controls
                style={{
                  maxWidth: '100%',
                  objectFit: 'contain',
                  marginBottom: '10px', // better than padding for spacing
                }}
              />
            );
          } else if (file.mimetype.startsWith('image')) {
            return (
              <img
                key={index}
                src={file.url}
                alt={`Selected file ${index}`}
                style={{
                  width: '100%',
                  objectFit: 'contain',
                  marginBottom: '10px',
                }}
              />
            );
          } else {
            return <Button key={index}>No Media</Button>;
          }
        })}
      </List>
    </Dialog>
  );
};

export default Settings;
