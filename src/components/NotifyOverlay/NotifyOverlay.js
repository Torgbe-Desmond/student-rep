import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { clearStack } from '../../Features/StackSlice'; // Adjust the import path as necessary
import Notification from '../Notification/Notification';

const NotifyOverlay = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, user: { username: 'John Doe', userIcon: 'https://i.pravatar.cc/40?img=1', color: 'green' }, messageContent: 'Anyone with access can view your invited visitors.' },
    { id: 2, user: { username: 'Jane Smith', userIcon: 'https://i.pravatar.cc/40?img=2', color: 'blue' }, messageContent: 'Anyone with access can view your invited visitors.' },
    { id: 3, user: { username: 'Alice Johnson', userIcon: 'https://i.pravatar.cc/40?img=3', color: 'orange' }, messageContent: 'Anyone with access can view your invited visitors.' },
    { id: 4, user: { username: 'John Doe', userIcon: 'https://i.pravatar.cc/40?img=1', color: 'green' }, messageContent: 'Anyone with access can view your invited visitors.' },
    { id: 5, user: { username: 'Jane Smith', userIcon: 'https://i.pravatar.cc/40?img=2', color: 'blue' }, messageContent: 'Anyone with access can view your invited visitors.' },
    { id: 6, user: { username: 'Alice Johnson', userIcon: 'https://i.pravatar.cc/40?img=3', color: 'orange' }, messageContent: 'Anyone with access can view your invited visitors.' },
  ]);

  const dispatch = useDispatch();

  const handleClose = (id) => {
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    setNotifications(updatedNotifications);

    if (updatedNotifications.length === 0) {
      dispatch(clearStack());
    }
  };

  const handleClearStack = (event) => {
    event.stopPropagation();
    setNotifications([]);
    dispatch(clearStack());
  };

  return (
    <Box
      onClick={handleClearStack}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          maxHeight: '50vh', // Adjust this value as needed
          overflowY: 'auto',
          width: '80%', // Adjust this value as needed
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderRadius: 1,
          p: 2,
          boxShadow: 3,
          position: 'relative',
        }}
        onClick={(event) => event.stopPropagation()} // Prevent click propagation to the parent Box
      >
    
        {notifications.map(notification => (
          <Notification
            key={notification.id}
            user={notification.user}
            message={notification}
            onClose={() => handleClose(notification.id)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default NotifyOverlay;
