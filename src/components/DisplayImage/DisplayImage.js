import React, { useEffect, useState } from 'react';
import { Box, Button, Paper } from '@mui/material';
import Draggable from 'react-draggable';
import { useDispatch, useSelector } from 'react-redux';
import { handleStackClear } from '../HandleStack/HandleStack';
import './DisplayImage.css';
import CloseIcon from '@mui/icons-material/Close';

const DisplayImage = () => {
  const reference_Id = localStorage.getItem('reference_Id');
  const { selectedFolders: selectedFolderList, folders } = useSelector((state) => state.work);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filename, setFilename] = useState('');
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.darkMode);


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
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'fit-content',
          height: 'fit-content',
          zIndex: 1000,
        }}
      >
        <Box className="display-image-overlay">
          <Box className={`display-image-container ${ isDarkMode ? 'dark-mode-display': ''}`}>
            <Box
              id="draggable-display-image-title"
              sx={{
                cursor: 'move',
                width: '300px',
                backgroundColor: isDarkMode ? 'dark-mode':'',
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
                sx={{ color: isDarkMode ? '#FFF':''}}
              >
                {filename}
              </Button>

            
              <CloseIcon  
              sx={{ color: 'red', cursor:'pointer', m:1 }}
              onClick={() => handleStackClear(dispatch)} />


            </Box>
            <Box sx={{
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center',
                maxHeight:'500px',
                overflow:'auto',
                boxSizing:'border-box'
            }}>
            {selectedFiles.map((file, index) => {
              if (file.mimetype.startsWith('video')) {
                return (
                  <video
                    key={index}
                    src={file.url}
                    controls
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
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
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                    }}
                  />
                );
              } else {
                return  <Button>No Media</Button>;
              }
            })}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Draggable>
  );
};

export default DisplayImage;
