import React from "react";
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

const ReusableTable = ({
  data,
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

  return (
    <TableContainer
      component={Paper}
      sx={{ width: "100%", borderRadius: "none" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={
                  selectedFolders?.length > 0 && selectedFolders?.length < folderData?.length
                }
                checked={
                  selectedFolders?.length === folderData?.length && folderData?.length > 0
                }
                onChange={handleSelectAll}
              />
            </TableCell>
            {[
              "Status",
              "Folder",
              "Name",
              "Mime Type",
              "Items",
              "Last Modified",
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
                  <TableCell>{renderStatus(folder)}</TableCell>
                  <TableCell
                    sx={{
                      cursor:
                        folder.mimetype === "Shared" ? "pointer" : "default",
                    }}
                    onClick={() => handleCopyToClipboard(folder)}
                  >
                    {renderIcon(folder.mimetype)}
                  </TableCell>
                  <TableCell
                    sx={{
                      ...getCellStyles(isDarkMode),
                      cursor: "pointer",
                      textOverflow: "ellipsis",
                      maxWidth:"150px",
                      whiteSpace:"nowrap",
                      overflow:"hidden",
                    }}
                    onClick={() => handleNavigate(folder._id, folder.mimetype)}
                  >
                    {folder.name}
                  </TableCell>
                  <TableCell>{folder.mimetype}</TableCell>
                  <TableCell>{handleFileSize(folder)}</TableCell>
                  <TableCell>
                    {new Date(folder.lastUpdated).toLocaleDateString()}
                  </TableCell>
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
  );
};

export default ReusableTable;
