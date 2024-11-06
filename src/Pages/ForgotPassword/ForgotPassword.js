import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { forgotPassword } from '../../Features/AuthSlice';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    dispatch(forgotPassword({ token, email }));
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} p={4} boxShadow={3}  sx={{background:'#FFF'}}>
        <Typography variant="h4" gutterBottom>Forgot Password</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            value={email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {status === 'loading' && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Forgot Password
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ForgotPasswordPage;
