import React, { useEffect, useState } from 'react';
import './Footer.css';

function Footer({ currentTime,duration,seekVideo,index }) {
    console.log(currentTime)
  return (
    <div className="video-progress-bar">
          <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={(e) => seekVideo(index, parseFloat(e.target.value))}
          className="progress"
        />
    </div>
  );
}

export default Footer;
