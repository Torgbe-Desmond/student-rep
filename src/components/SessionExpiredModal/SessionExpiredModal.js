import React from 'react';
import {
  Typography,
  Button,
} from '@mui/material';
import './SessionExpiredModal.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleStackClear } from '../HandleStack/HandleStack';

const SessionExpiredModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const moveToLogin = () => {
    localStorage.clear()
    navigate(`/`);
    handleStackClear(dispatch)
  };

  return (
   <div className='session-expired-overlay'>
        <div className='session-expired-modal'>
            <div className='session-expired-body'>
                   <Typography variant="h6" component="h2" gutterBottom>
                     Your session has expired
                   </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      Please log in again to continue.
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={moveToLogin}
                    >
                      Logout
                    </Button>
            </div>
        </div>
   </div>
  );
};

export default SessionExpiredModal;
