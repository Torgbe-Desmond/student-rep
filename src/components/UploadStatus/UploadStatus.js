import React, { useEffect, useState } from 'react';
import { Alert, Snackbar, CircularProgress } from '@mui/material';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { updateFile } from '../../Features/WorkSpace';

export default function UploadStatus({ reference_Id }) {
  const [socket, setSocket] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const url = ["https://file-transfer-app-backend.vercel.app","http://localhost:5000"]

  useEffect(() => {
    const newSocket = io(url[1], {
      transports: ["polling", "websocket"],
      query: { userData: JSON.stringify({ reference_Id }) },
    });

    setSocket(newSocket);
    setLoading(false);

    return () => {
      newSocket.disconnect();
      setSocket(null);
    };
  }, [reference_Id]);

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

  return (
    <>
      {loading && <CircularProgress sx={{ display: 'block', margin: 'auto' }} />}

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
