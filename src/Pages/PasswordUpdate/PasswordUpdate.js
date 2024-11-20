import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Box, Typography, Snackbar, Alert } from '@mui/material';
import './PasswordUpdate.css';
import { useDispatch, useSelector } from 'react-redux';
import { getVerificationToken, updatePassword } from '../../Features/AuthSlice';
import { useNavigate, useParams } from 'react-router-dom';

const PasswordUpdate = () => {
  const [passwords, setPasswords] = useState({ newPassword: '', confirmPassword: '' });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { reference_Id } = useParams();
  const verificationTokenStatus = useSelector((state) => state.auth.verificationTokenStatus);

  useEffect(() => {
    if (reference_Id) {
      dispatch(getVerificationToken({ reference_Id }));
    }

    return () => {
      localStorage.removeItem('verificationToken');
    };
  }, [dispatch, reference_Id]);

  useEffect(() => {
    if (verificationTokenStatus === 'succeeded') {
      setSnackbarMessage('Token verification successful');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setTimeout(()=>{
          navigate('/')
      },3000)
    } else if (verificationTokenStatus === 'failed') {
      setSnackbarMessage('Token verification failed');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } else if(verificationTokenStatus === 'succeeded'){
      setSnackbarMessage('Password updated successfully');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    }
  }, [verificationTokenStatus]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { newPassword, confirmPassword } = passwords;

    if (!newPassword || !confirmPassword) {
      setSnackbarMessage('Both fields are required');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    if (newPassword.length < 6) {
      setSnackbarMessage('Password must be at least 6 characters long');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setSnackbarMessage('Passwords do not match');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    dispatch(updatePassword({ newPassword }));
    setPasswords({ newPassword: '', confirmPassword: '' });
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="password-update-container">
      <Container maxWidth="sm">
        <Box
          mt={4}
          p={4}
          sx={{ background: '#FFF', borderRadius: '8px', backgroundColor: 'transparent' }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Update Password
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="New Password"
              name="newPassword"
              type="password"
              value={passwords.newPassword}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={passwords.confirmPassword}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Update Password
            </Button>
          </form>
        </Box>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default PasswordUpdate;
