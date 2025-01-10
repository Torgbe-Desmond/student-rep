import React from "react";
import "./Footer.css";
import { useCallback } from "react";
import { debounce } from "@mui/material";

function Footer({ currentTime, duration, seekVideo, index }) {
  const debouncedSeek = useCallback(
    debounce((time) => seekVideo(index, time), 200),
    [index, seekVideo]
  );

  return (
    <div className="video-progress-container">
      <div className="video-progress-bar">
        <input
          type="range"
          min="0"
          max={duration || 0} // Ensure no NaN errors
          value={currentTime || 0}
          onChange={(e) => debouncedSeek(parseFloat(e.target.value))}
          className="progress"
        />
      </div>
    </div>
  );
}

export default Footer;
