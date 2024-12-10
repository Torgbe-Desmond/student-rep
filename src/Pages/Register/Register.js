import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Container, Typography, Box, CircularProgress, Snackbar, Alert } from '@mui/material';
import { clearError, register } from '../../Features/AuthSlice';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false); 
  const dispatch = useDispatch();
  const registerStatus = useSelector((state) => state.auth.registerStatus);
  const error = useSelector((state) => state.auth.error);
  const navigate = useNavigate();
  const reference_Id = localStorage.getItem('reference_Id');
  const isDarkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    if (registerStatus === 'succeeded' && reference_Id) {
      navigate(`/${reference_Id}/directories`);
    }
  }, [registerStatus, reference_Id, navigate]);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleChange = (e) => {
    if (e.target.name === 'confirmPassword') {
      setConfirmPassword(e.target.value);
    } else {
      setUserInfo({
        ...userInfo,
        [e.target.name]: e.target.value,
      });
    }
    setPasswordError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userInfo?.username || !userInfo?.email || !userInfo?.password || !confirmPassword) {
      setSnackbarMessage('Please fill in all fields.');
      setOpenSnackbar(true);
      return;
    }

    if (userInfo?.password !== confirmPassword) {
      setPasswordError(true);
      setSnackbarMessage("Passwords don't match.");
      setOpenSnackbar(true);
      return;
    }

    dispatch(register(userInfo));
  };

useEffect(() => {
  if (error) {
    setSnackbarMessage(error);
    setOpenSnackbar(true);
  }

  return () => {
    dispatch(clearError());
  };
}, [error, dispatch]);

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
    <div className='register-container'>
      <Container maxWidth="sm">
        <Typography variant="h4" align="center">
          <ShareOutlinedIcon sx={{ fontSize: 50 }} />
          <FileCopyOutlinedIcon sx={{ fontSize: 50 }} />
        </Typography>        
        <Box mt={2} p={4}>
          <form onSubmit={handleSubmit}>
            <TextField
              sx={darkMode}
              placeholder="Username"
              name="username"
              value={userInfo.username}
              onChange={handleChange}
              fullWidth
              margin="normal"
              disabled={registerStatus === 'loading'}
            />
            <TextField
              sx={darkMode}
              placeholder="Email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              disabled={registerStatus === 'loading'}
            />
            <TextField
              sx={darkMode}
              placeholder="Password"
              name="password"
              type="password"
              value={userInfo.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              disabled={registerStatus === 'loading'}
            />
            <TextField
             sx={darkMode}
              placeholder="Confirm Password"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={passwordError}
              disabled={registerStatus === 'loading'}
              helperText={passwordError ? "Passwords don't match" : ""}
            />
            <Button
              type="submit"
              variant="contained"
              color={passwordError ? 'error' : 'primary'}
              fullWidth
              disabled={registerStatus === 'loading'}
              style={{ position: 'relative', marginTop: 10,height:'50px' }}
            >
              {registerStatus === 'loading' ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Register'
              )}
            </Button>
          </form>
        </Box>
        <Typography align="center">
          Already have an account?{' '}
          <Link sx={{color:'blue'}}  to="/" variant="body2">
            Login here
          </Link>
        </Typography>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Register;
