import React from 'react';
import './Image.css';

const Image = ({ file }) => {
  return (
    <div className="image-holder">
      <img src={file.url} alt={file.name || 'Selected file'} className="image-item" />
    </div>
  );
};

export default Image;
