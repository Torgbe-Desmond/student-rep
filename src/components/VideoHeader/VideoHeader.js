import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import { Typography, useMediaQuery } from "@mui/material";
import "./VideoHeader.css";

function VideoHeader({
  toggleMute,
  isMuted,
  handleToggleDialog,
  selectedFiles,
  file,
}) {

    const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  

  return (
    <div className="video-header-container">
      <div  className={`videoHeader ${isDarkMode ? 'switch':'light'}`}>
        {/* Back Arrow */}
        <ArrowBackIosIcon
          onClick={handleToggleDialog}
          sx={{ fontSize: "32px", cursor: "pointer" }}
        />
        {/* Selected Files Count */}
        <Typography
          variant="h6"
          sx={{
            display:'flex',
            justifyContent:{xs:'flex-start',md:'center',lg:'center'},
            alignItems:'center',
            textAlign: "center",
            minWidth: "200px",
            overflowX: "scroll",
          }}
        >
          {file?.name}
        </Typography>

        {/* Volume Control */}
        {isMuted ? (
          <VolumeOffIcon
            sx={{ fontSize: "32px", cursor: "pointer", zIndex: 999 }}
            onClick={toggleMute}
          />
        ) : (
          <VolumeUpIcon
            sx={{ fontSize: "32px", cursor: "pointer", zIndex: 999 }}
            onClick={toggleMute}
          />
        )}
      </div>
    </div>
  );
}

export default VideoHeader;
