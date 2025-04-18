import React from "react";
import { Checkbox, Paper, CircularProgress, Typography } from "@mui/material";
import "./List.css";

const List = ({
  data,
  setDetails,
  selectedFolders,
  setSelectedFolders,
  handleSelectAll,
  isLoading,
  error,
  isDarkMode,
  folderData,
  toggleFolderSelection,
  renderIcon,
  renderStatus,
  handleCopyToClipboard,
  getCellStyles,
  handleNavigate,
  handleFileSize,
}) => {
  const toggleSelection = (id) => {
    setSelectedFolders((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleSetDetails = (folder) => {
    setDetails(folder);
  };

  return (
    <div className="list-container-v">
      {isLoading === "succeeded" && folderData?.length > 0 ? (
        folderData.map((folder, index) => (
          <div
            className="list-item-v"
            key={index}
            onClick={() => handleNavigate(folder._id, folder.mimetype)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = isDarkMode
                ? "#555"
                : "#f5f5f5")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = selectedFolders.includes(
                folder._id
              )
                ? isDarkMode
                  ? "#555"
                  : "#e0f7fa"
                : isDarkMode
                ? "#444"
                : folder.backgroundColor || "white")
            }
          >
            <div onClick={(e) => e.stopPropagation()}>
              <Checkbox
                checked={selectedFolders.includes(folder._id)}
                onChange={() => toggleFolderSelection(folder._id)}
              />
            </div>
            <div className="hold-f-s">
              <div>{renderStatus(folder)}</div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopyToClipboard(folder);
                }}
              >
                {renderIcon(folder.mimetype)}
              </div>
              <div className="f-name">{folder.name}</div>
            </div>
          </div>
        ))
      ) : isLoading === "succeeded" && folderData?.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Typography>No folders available</Typography>
        </div>
      ) : null}
    </div>
  );
};

export default List;
