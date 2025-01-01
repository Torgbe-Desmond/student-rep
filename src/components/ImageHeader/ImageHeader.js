import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "./ImageHeader.css";

function ImageHeader({ handleToggleDialog, file }) {
  return (
    <div className="image-header-container">
      <div className="image-header">
        <ArrowBackIosIcon
          onClick={handleToggleDialog}
          sx={{ fontSize: "32px", cursor: "pointer" }}
          aria-label="Go back"
          role="button"
        />
      </div>
      
      <div className="image-name">{file?.name || "Untitled Image"}</div>
    </div>
  );
}

export default ImageHeader;
