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

  // Dynamically set the backend URL based on the environment (production or development)
// Local development URL (change port if needed)
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
  }, [reference_Id, url]);  // Reconnect if reference_Id or URL changes

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (!socket) return;
    
    const onUploading = (data) => {
      dispatch(updateFile(data.file));  // Update file status in Redux store
      setSnackbarMessage(`${data?.process} for ${data?.file?.name}`);  // Show message in Snackbar
      setOpenSnackbar(true);  // Open Snackbar
    };

    // Listen for the "uploading" event
    socket.on('uploading', onUploading);

    return () => {
      socket.off('uploading', onUploading);  // Cleanup event listener
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
