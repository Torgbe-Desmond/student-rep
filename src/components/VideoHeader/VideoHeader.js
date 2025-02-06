import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import { Box, Tooltip } from "@mui/material";
import "./VideoHeader.css";

function VideoHeader({ toggleMute, fileName, isMuted, handleToggleDialog }) {
  return (
    <div className="videoHeader">
      <ArrowBackIosIcon
        sx={{
          fontSize: "32px",
          cursor: "pointer",
          textShadow: " 2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
        onClick={handleToggleDialog}
      />

      <Tooltip title={fileName} arrow>
        <Box className="videoHeader-title">{fileName}</Box>
      </Tooltip>

      {isMuted ? (
        <VolumeOffIcon
          sx={{
            fontSize: "32px",
            cursor: "pointer",
            zIndex: 999,
            textShadow: " 2px 2px 4px rgba(9, 8, 8, 0.5)",
          }}
          onClick={toggleMute}
        />
      ) : (
        <VolumeUpIcon
          sx={{
            fontSize: "32px",
            cursor: "pointer",
            zIndex: 999,
            textShadow: " 2px 2px 4px rgba(0, 0, 0, 0.5)",
          }}
          onClick={toggleMute}
        />
      )}
    </div>
  );
}

export default VideoHeader;
