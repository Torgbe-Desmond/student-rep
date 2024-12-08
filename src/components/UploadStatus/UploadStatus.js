import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { Typography, Alert, CircularProgress, Snackbar } from '@mui/material';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { updateFile } from '../../Features/WorkSpace';

export default function UploadStatus({ reference_Id }) {
  const [step, setStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(5);
  const [error, setError] = useState(null); // State for tracking errors
  const [socket, setSocket] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const newSocket = io('http://localhost:5000', {
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
  }, [reference_Id]);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (!socket) return;

    const onUploading = (data) => {
      dispatch(updateFile(data.file)); // Update file in Redux
      setSnackbarMessage(`${data?.process} for ${data?.file?.name}`);
      setOpenSnackbar(true); // Open snackbar when a message is received
    };

    socket.on('uploading', onUploading);

    return () => {
      socket.off('uploading', onUploading); // Cleanup listener
    };
  }, [socket, dispatch]);

  const formatFileName = (fileName) => {
    if (!fileName) return 'No file';
    return fileName.length > 20 ? `${fileName.slice(0, 17)}...` : fileName;
  };

  return (
    <>
      {/* Snackbar for showing messages */}
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
