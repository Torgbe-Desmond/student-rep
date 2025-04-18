import React from "react";
import { CircularProgress, Typography } from "@mui/material";

const Status = ({ isLoading, error }) => {
  if (isLoading === "loading") {
    return (
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <CircularProgress size={24} />
      </div>
    );
  }

  if (isLoading === "failed") {
    return (
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <Typography color="error">
          {error || "Failed to load folders"}
        </Typography>
      </div>
    );
  }

  return null;
};

export default Status;
