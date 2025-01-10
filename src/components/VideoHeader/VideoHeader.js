import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { Box, Tooltip } from '@mui/material';
import './VideoHeader.css';

function VideoHeader({ toggleMute, fileName, isMuted, handleToggleDialog }) {
  return (
    <div className="videoHeader">
      {/* Back Arrow */}
      <ArrowBackIosIcon sx={{ fontSize: '32px' }} onClick={handleToggleDialog} />

      {/* Title with Tooltip */}
      <Tooltip title={fileName} arrow>
        <Box className="videoHeader-title">{fileName}</Box>
      </Tooltip>

      {isMuted ? (
        <VolumeOffIcon
          sx={{ fontSize: '32px', cursor: 'pointer', zIndex: 999 }}
          onClick={toggleMute}
        />
      ) : (
        <VolumeUpIcon
          sx={{ fontSize: '32px', cursor: 'pointer', zIndex: 999 }}
          onClick={toggleMute}
        />
      )}
    </div>
  );
}

export default VideoHeader;
