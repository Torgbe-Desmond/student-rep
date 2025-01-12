import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Container, Typography, Box, Snackbar, Alert, LinearProgress, useMediaQuery } from '@mui/material';
import { verifyEmail } from '../../Features/AuthSlice';
import './ForgotPassword.css'
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)')


  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.verifyEmailStatus);
  const error = useSelector((state) => state.auth.error);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setSnackbarMessage('Please enter an email');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    dispatch(verifyEmail({ email }));
  };

  // Handle snackbar close
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (status === 'succeeded') {
      setSnackbarMessage('Verification email sent successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    }

    if (status === 'failed') {
      setSnackbarMessage(error || 'Something went wrong. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  }, [status, error]);

  const darkMode = {
    color: isDarkMode ? '#FFF' : '', 
    '& .MuiInputBase-input': {
      color: isDarkMode ? '#FFF' : '', 
      background: isDarkMode ? '#555':''
    },
    '& .MuiInputBase-input::placeholder': {
      color: isDarkMode ? '#FFF' : '',  
    },
 }


  return (
    <div className='forgot-password-container'>
       <Container sx={{width:'500px'}} maxWidth="sm" >
      <Box mt={4} p={4} sx={{ background: '#FFF', backgroundColor:'transparent',  }}>
        <Typography variant="h4" gutterBottom>
          Forgot Password ?
        </Typography>

        {status === 'loading' && <LinearProgress sx={{ marginBottom: 2 }} />}

        <form onSubmit={handleSubmit}>
          <TextField
            sx={darkMode}
            placeholder="Enter email"
            value={email}
            onChange={handleChange}
            fullWidth
            name='email'
            margin="normal"
          />

          <Button 
          sx={{marginTop:3, height:'50px'}} 
          type="submit" 
          variant="contained"
          color="primary" 
          fullWidth>
            Verify Email
          </Button>
        </form>
        <Typography align="center" sx={{marginTop:3}} >
          Go back {' '}
          <Link to="/" variant="body2" sx={{ml:2}}  className={`${isDarkMode ? 'switch' : ''}`}>
            Login here
          </Link>
        </Typography>
      </Box>

      <Snackbar
        open={snackbarOpen}
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

export default ForgotPasswordPage;
