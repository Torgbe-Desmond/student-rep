import React, { useEffect, useState } from "react";
import "./Image.css";
import ImageHeader from "../ImageHeader/ImageHeader";

const Image = ({ file, handleToggleDialog }) => {
  const [currentFile,setCurrentFile] = useState(null)

  useEffect(()=>{
    setCurrentFile(file)
  },[file])


  return (
    <>
      <ImageHeader file={currentFile} handleToggleDialog={handleToggleDialog} />
      <div className="image-holder">
        <img
          src={currentFile?.url}
          alt={currentFile?.name || "Selected file"}
          className="image-item"
        />
      </div>
    </>
  );
};

export default Image;
