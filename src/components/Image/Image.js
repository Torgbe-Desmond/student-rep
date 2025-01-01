import React from "react";
import "./Image.css";
import ImageHeader from "../ImageHeader/ImageHeader";

const Image = ({ file, handleToggleDialog }) => {
  return (
    <>
      <ImageHeader file={file} handleToggleDialog={handleToggleDialog} />
      <div className="image-holder">
        <img
          src={file.url}
          alt={file.name || "Selected file"}
          className="image-item"
        />
      </div>
    </>
  );
};

export default Image;
