import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Container, Typography, Box, CircularProgress, Snackbar, Alert } from '@mui/material';
import { register } from '../../Features/AuthSlice';
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
  const dispatch = useDispatch();
  const registerStatus = useSelector((state) => state.auth.registerStatus);
  const message = useSelector((state) => state.auth.message);
  const [successMessage , setSuccessMessage]= useState(null); 
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false); 



  useEffect(() => {
    if (message) {
      setOpenSnackbar(true); 
    }
  }, [message]);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false); // Close snackbar
  };

  if (registerStatus === 'succeeded') {
      navigate(`/`);
  }



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
    if (userInfo.password !== confirmPassword) {
      setPasswordError(true);
      return;
    }

    dispatch(register(userInfo))
    
  };

  return (
    <div className='register-container'>
      <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
            Student File Sharing App
      </Typography>
        <Box mt={4} p={4} boxShadow={3}  sx={{background:'#FFF'}}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              name="username"
              value={userInfo.username}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={userInfo.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={passwordError}
              helperText={passwordError ? "Passwords don't match" : ""}
            />
            <Button
              type="submit"
              variant="contained"
              color={passwordError ? 'error' : 'primary'} 
              fullWidth
              disabled={registerStatus === 'loading'} 
              style={{ position: 'relative' }} 
            >
              {registerStatus === 'loading' ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Register'
              )}
            </Button>
          </form>
        </Box>
        <Typography align="center" mt={5}>
          Don’t have an account?{' '}
          <Link  to="/" variant="body2">
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
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Register;
