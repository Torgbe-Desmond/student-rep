import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "./ImageHeader.css";
import { useMediaQuery } from "@mui/material";

function ImageHeader({ handleToggleDialog, file }) {
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  
  return (
    <div className="image-header-container">
      <div className={ `image-header ${isDarkMode ? 'switch':'light'} `}>
        <ArrowBackIosIcon
          onClick={handleToggleDialog}
          sx={{ fontSize: "32px", cursor: "pointer" }}
          aria-label="Go back"
          role="button"
        />
      </div>
      
      <div className={`image-name ${isDarkMode ? 'switch':'light'}`}>{file?.name || "Untitled Image"}</div>
    </div>
  );
}

export default ImageHeader;
