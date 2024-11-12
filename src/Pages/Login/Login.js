import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Features/AuthSlice';
import { TextField, Button, Container, Box, CircularProgress, Snackbar, Alert, Typography } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.css';
import { getAllFolders } from '../../Features/WorkSpace';
import ParticlesComponent from '../../components/particles/Particles';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [openSnackbar, setOpenSnackbar] = useState(false); // State for snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Message to show in snackbar
  const dispatch = useDispatch();
  const moveItemStatus = useSelector((state) => state.work.moveItemStatus);
  const status = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);
  const reference_Id = localStorage.getItem('reference_Id');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (reference_Id) {
      dispatch(getAllFolders({ reference_Id }));
    }
  }, [status, reference_Id, dispatch]);

  useEffect(() => {
    if (moveItemStatus === 'succeeded' && reference_Id) {
      navigate(`/${reference_Id}/directories`);
    }
  }, [moveItemStatus, reference_Id, navigate]);

  useEffect(() => {
    if (location.pathname === '/login') {
      localStorage.removeItem('reference_Id');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('mainFolder');
      localStorage.removeItem('Unauthorized');
    }
  }, [location.pathname]);

  useEffect(() => {
    if (error) {
      setSnackbarMessage('Error logging in. Please try again.');
      setOpenSnackbar(true);
    }
  }, [error]);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation checks
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

    // Dispatch login action if inputs are valid
    dispatch(login(credentials));
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className='login-container'>
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Student File Sharing App
        </Typography>
        <Box mt={4} p={4} boxShadow={3} sx={{ background: '#FFF' }}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={status === 'loading'}
              style={{ position: 'relative' }}
            >
              {status === 'loading' ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Login'
              )}
            </Button>
          </form>
        </Box>

        <Typography align="center" mt={5}>
          Don’t have an account?{' '}
          <Link to="/register" variant="body2">
            Register here
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
