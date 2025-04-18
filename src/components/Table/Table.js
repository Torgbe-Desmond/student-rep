import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  CircularProgress,
  Typography,
} from "@mui/material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./Table.css";
import AnchorTemporaryDrawer from "../Drawer/Drawer";
const ReusableTable = ({
  data,
  setOpen,
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
    setOpen(true);
    setDetails(folder);
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ borderRadius: "none", border: "none" }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                width: "100%",
                // borderBottom: "1px solid #ccc",
                fontSize: "24px",
              }}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedFolders?.length > 0 &&
                    selectedFolders?.length < folderData?.length
                  }
                  checked={
                    selectedFolders?.length === folderData?.length &&
                    folderData?.length > 0
                  }
                  onChange={handleSelectAll}
                />
              </TableCell>
              {[
                "Status",
                "Folder",
                "Name",
              ].map((header) => (
                <TableCell key={header}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading === "loading" && (
              <TableRow>
                <TableCell colSpan={12} align="center">
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            )}
            {isLoading === "failed" && (
              <TableRow>
                <TableCell colSpan={12} align="center">
                  <Typography color="error">
                    {error || "Failed to load folders"}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {isLoading === "succeeded" && folderData?.length > 0
              ? folderData.map((folder, index) => (
                  <TableRow
                    key={index}
                    selected={selectedFolders.includes(folder._id)}
                    sx={{
                      backgroundColor: isDarkMode
                        ? "#444"
                        : folder.backgroundColor,
                      "&:hover": {
                        backgroundColor: isDarkMode ? "#555" : "#f5f5f5",
                      },
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedFolders.includes(folder._id)}
                        onChange={() => toggleFolderSelection(folder._id)}
                      />
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "20px",
                      }}
                    >
                      {renderStatus(folder)}
                    </TableCell>
                    <TableCell
                      sx={{
                        cursor:
                          folder.mimetype === "Shared" ? "pointer" : "default",
                        width: "20px",
                      }}
                      onClick={() => handleCopyToClipboard(folder)}
                    >
                      {renderIcon(folder.mimetype)}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...getCellStyles(isDarkMode),
                        justifyContent: "space-between",
                        cursor: "pointer",
                        textOverflow: "ellipsis",
                        width: { sm: "150px", md: "100%", lg: "100%" },
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                      }}
                    >
                      <div className="name-option">
                        <span
                          onClick={() =>
                            handleNavigate(folder._id, folder.mimetype)
                          }
                        >
                          {" "}
                          {folder.name}
                        </span>
                      </div>
                    </TableCell>
                
                    {/* <TableCell>
                      <MoreVertIcon onClick={() => handleSetDetails(folder)} />
                    </TableCell> */}
                  </TableRow>
                ))
              : isLoading === "succeeded" &&
                folderData?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={12} align="center">
                      <Typography>No folders available</Typography>
                    </TableCell>
                  </TableRow>
                )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ReusableTable;
