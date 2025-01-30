import React, { useEffect, useState } from 'react';
import { Typography, Alert, CircularProgress, Snackbar } from '@mui/material';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { updateFile } from '../../Features/WorkSpace';

export default function UploadStatus({ reference_Id }) {
  const [step, setStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(5);
  const [error, setError] = useState(null); 
  const [socket, setSocket] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const dispatch = useDispatch();

let url = ['','http://localhost:5000']

  useEffect(() => {
    const newSocket = io("https://file-transfer-app-backend.vercel.app", {
      query: {
        userData: JSON.stringify({
          reference_Id,
        }),
      },
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [reference_Id, url]); 

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (!socket) return;
    
    const onUploading = (data) => {
      dispatch(updateFile(data.file));  
      setSnackbarMessage(`${data?.process} for ${data?.file?.name}`);  
      setOpenSnackbar(true);  
    };

    socket.on('uploading', onUploading);

    return () => {
      socket.off('uploading', onUploading); 
    };
  }, [socket, dispatch]);

  const formatFileName = (fileName) => {
    if (!fileName) return 'No file';
    return fileName.length > 20 ? `${fileName.slice(0, 17)}...` : fileName;
  };

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
