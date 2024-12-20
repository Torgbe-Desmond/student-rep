import React, { useEffect, useState } from 'react';
import {
  Typography,
  Button,
} from '@mui/material';
import './SessionExpiredModal.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleStackClear } from '../HandleStack/HandleStack';

const SessionExpiredModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(false);
  const isDarkMode = useSelector((state) => state.theme.darkMode);

  // useEffect(() => {
  //     const storedDarkMode = localStorage.getItem('darkMode') === 'true';
  //     setDarkMode(storedDarkMode);
  // }, []);


  const moveToLogin = () => {
    localStorage.clear()
    navigate(`/`);
    handleStackClear(dispatch)
  };

  return (
   <div className={`session-expired-overlay ${isDarkMode ? 'session-dark-mode' :''}`}>
        <div className='session-expired-modal'>
            <div className='session-expired-body'>
                   <Typography
                   sx={{ color: isDarkMode ? 'session-dark-mode' :''}}
                   variant="h6" component="h2" gutterBottom>
                     Your session has expired
                   </Typography>
                    <Typography variant="body2" sx={{ mb: 2, color:isDarkMode ? '#000':'' }}>
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
