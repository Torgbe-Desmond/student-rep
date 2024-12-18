import React from 'react';
import './Footer.css';

function Footer({ currentTime, duration, seekVideo, index }) {
  console.log('duration',duration)
  return (
    <div className="video-progress-bar">
      <input
        type="range"
        min="0"
        max={duration || 0} // Ensure no NaN errors
        value={currentTime || 0}
        onChange={(e) => seekVideo(index, parseFloat(e.target.value))}
        className="progress"
      />
    </div>
  );
}

export default Footer;
