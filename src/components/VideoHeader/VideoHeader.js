import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { Typography } from '@mui/material';
import './VideoHeader.css';

function VideoHeader({ toggleMute, isMuted, handleToggleDialog, selectedFiles, mimetype }) {
  return (
    <div className="videoHeader">
      {/* Back Arrow */}
      <ArrowBackIosIcon 
        onClick={handleToggleDialog}
        sx={{ fontSize: '32px', cursor: 'pointer' }} 
      />

      {/* Selected Files Count */}
      <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
        {selectedFiles?.length > 0
          ? `${selectedFiles.length} items selected`
          : 'No files selected'}
      </Typography>

      {/* Volume Control */}
      {mimetype?.startsWith('video') ?(
        isMuted ? (
          <VolumeOffIcon
            sx={{ fontSize: '32px', cursor: 'pointer', zIndex: 999 }}
            onClick={toggleMute}
          />
        ) : (
          <VolumeUpIcon
            sx={{ fontSize: '32px', cursor: 'pointer', zIndex: 999 }}
            onClick={toggleMute}
          />
        )
      ) : <VolumeOffIcon
           sx={{ fontSize: '32px', cursor: 'pointer', zIndex: 999 }}
    />
    
    }
    </div>
  );
}

export default VideoHeader;
