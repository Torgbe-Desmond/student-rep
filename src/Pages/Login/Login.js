import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, login } from '../../Features/AuthSlice';
import { TextField, Button, Container, Box, CircularProgress, Snackbar, Alert, Typography, useMediaQuery } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { getAllFolders } from '../../Features/WorkSpace';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { clearStack } from '../../Features/StackSlice';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  const dispatch = useDispatch();
  const moveItemStatus = useSelector((state) => state.work.moveItemStatus);
  const status = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);
  const reference_Id = localStorage.getItem('reference_Id');
  
  const navigate = useNavigate();
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  // Clear stack once when component mounts
  useEffect(() => {
    dispatch(clearStack());
  }, []);

  // Fetch folders when reference_Id changes
  useEffect(() => {
    if (reference_Id) {
      dispatch(getAllFolders({ reference_Id }));
    }
  }, [reference_Id, dispatch]);

  // Navigate when moveItemStatus succeeds
  useEffect(() => {
    if (moveItemStatus === 'succeeded' && reference_Id) {
      navigate(`/${reference_Id}/directories`);
    }
  }, [moveItemStatus, reference_Id, navigate]);

  // Handle and display errors
  useEffect(() => {
    if (error) {
      setSnackbarMessage(error);
      setOpenSnackbar(true);
    }
  }, [error]);

  // Clear error on component unmount
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!credentials.email) {
      setSnackbarMessage('Email is required');
      setOpenSnackbar(true);
      return;
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      setSnackbarMessage('Please enter a valid email');
      setOpenSnackbar(true);
      return;
    }

    if (!credentials.password) {
      setSnackbarMessage('Password is required');
      setOpenSnackbar(true);
      return;
    } else if (credentials.password.length < 6) {
      setSnackbarMessage('Password must be at least 6 characters');
      setOpenSnackbar(true);
      return;
    }

    dispatch(login(credentials));
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className={`login-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <Container maxWidth="sm">
        <Typography variant="h4" align="center">
          <ShareOutlinedIcon sx={{ fontSize: 50 }} />
          <FileCopyOutlinedIcon sx={{ fontSize: 50 }} />
        </Typography>

        <Box mt={4} p={4}>
          <form onSubmit={handleSubmit}>
            <TextField
              sx={{
                color: isDarkMode ? '#FFF' : '', 
                '& .MuiInputBase-input': {
                  color: isDarkMode ? '#FFF' : '', 
                  background: isDarkMode ? '#555' : ''
                },
                '& .MuiInputBase-input::placeholder': {
                  color: isDarkMode ? '#FFF' : '',  
                },
              }}
              placeholder="Email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              disabled={status === 'loading'}
            />
            <TextField 
              sx={{
                color: isDarkMode ? '#FFF' : '', 
                '& .MuiInputBase-input': {
                  color: isDarkMode ? '#FFF' : '', 
                  background: isDarkMode ? '#555' : ''
                },
                '& .MuiInputBase-input::placeholder': {
                  color: isDarkMode ? '#FFF' : '',  
                },
              }}
              placeholder="Password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              disabled={status === 'loading'}
            />

            <Typography align="right" sx={{ margin: 2 }}>
              <Link to="/forgot-password" className={isDarkMode ? 'switch' : ''}>
                Forgot Password?
              </Link>
            </Typography>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={status === 'loading'}
              sx={{ mt: 1, height: '50px' }}
            >
              {status === 'loading' ? <CircularProgress size={24} color="inherit" /> : 'Login'}
            </Button>
          </form>
        </Box>

        <Typography align="center">
          <Link to="/register" className={isDarkMode ? 'switch' : ''}>
            Register
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

export default Login;
