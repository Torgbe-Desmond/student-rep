import React from 'react';
import { Box, Typography, IconButton, Avatar, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Notification = ({ user, message, onClose }) => {
  const { username, userIcon, messageContent } = message;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#FHFHFH',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        p: 2,
        mb: 2,
        borderLeft: `5px solid ${user.color}`,
        position: 'relative',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        marginTop:'20px'
        // width: ''
      }}
    >
      <Avatar src={userIcon} sx={{ mr: 2 }} />
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {username}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {messageContent}
        </Typography>
      </Box>
      <IconButton size="small" onClick={onClose} sx={{ position: 'absolute', right: '10px', top: '10px' }}>
        <Button variant='outlined'>
          Click To Read
        </Button>
      </IconButton>
    </Box>
  );
};

export default Notification;
