import React, { useEffect, useState } from "react";
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
  Button,
  Snackbar,
  IconButton,
  FormControlLabel,
  Switch,
} from "@mui/material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import KeyIcon from "@mui/icons-material/Key";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./NewList.css";
import { toggleDarkMode } from "../../Features/ThemeSlice";

const getFilteredData = (folderData, selectedFolders) => ({
  files: folderData?.filter(
    (folder) =>
      selectedFolders.includes(folder._id) &&
      folder.mimetype !== "Folder" &&
      folder.mimetype !== "Subscriptions"
  ),
  folders: folderData?.filter(
    (folder) =>
      selectedFolders.includes(folder._id) &&
      (folder.mimetype === "Folder" || folder.mimetype === "Subscriptions")
  ),
});

function NewList({
  initialFolderData,
  selectedFoldersState,
  setSelectedFilesForOptions,
  setSelectedFoldersForOptions,
  handleReload,
  isDarkMode,
}) {
  const [folderData, setFolderData] = useState([]);
  const [selectedFolders, setSelectedFolders] = useState([]);
  const { reference_Id } = useParams();
  const { status, error } = useSelector((state) => state.work);
  const stackState = useSelector((state) => state.stack.stackState);
  const colorDifferentiation = useSelector(
    (state) => state.settings.colorDifferentiation
  );
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setFolderData(initialFolderData);
  }, [initialFolderData]);

  const toggleFolderSelection = (id) => {
    setSelectedFolders((prev) =>
      prev.includes(id)
        ? prev.filter((folderId) => folderId !== id)
        : [...prev, id]
    );
    selectedFoldersState((prev) =>
      prev.includes(id)
        ? prev.filter((folderId) => folderId !== id)
        : [...prev, id]
    );
  };

  useEffect(() => {
    if (stackState === "dropped") {
      setSelectedFolders([]);
      selectedFoldersState([]);
    }
  }, [stackState]);

  const [isDarkModeParent, setIsDarkModeParent] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (initialFolderData?.length) {
      const processedData = groupTimestamps(initialFolderData);
      setFolderData(processedData);
    }
  }, [initialFolderData]);

  const groupTimestamps = (data) => {
    const grouped = {};
    const colors = [
      "#FFDDC1", // Light peach
      "#D1E8E4", // Pale aqua
      "#FFC3A0", // Light orange
      "#D5AAFF", // Lavender
      "#B9FBC0", // Mint green
      "#FFB3BA", // Light pink
      "#BFFCC6", // Pale green
      "#FFFFBA", // Light yellow
      "#FFDFBA", // Peach
      "#BAE1FF", // Light blue
      "#C1D5FF", // Soft blue
      "#FFABAB", // Coral pink
      "#FFC1E3", // Light rose
      "#B4FFAB", // Lime green
      "#FFF7AB", // Lemon yellow
      "#ABEFFB", // Aqua blue
      "#D2BAFF", // Soft purple
      "#FFD9C0", // Apricot
      "#C0FFE3", // Pale teal
      "#E3C0FF", // Soft lavender
    ];

    data.forEach((item) => {
      const date = new Date(item.lastUpdated);
      const seconds = Math.floor(date.getSeconds() / 5) * 5;
      const timeKey = new Date(date.setSeconds(seconds, 0)).toISOString();

      if (!grouped[timeKey]) {
        grouped[timeKey] = [];
      }
      grouped[timeKey].push({ ...item });
    });

    const groupKeys = Object.keys(grouped);
    groupKeys.forEach((key, index) => {
      grouped[key].forEach((item) => {
        item.backgroundColor = colors[index % colors.length];
      });
    });

    return Object.values(grouped).flat();
  };

  const handleSelectAll = (event) => {
    const allFolderIds = event.target.checked
      ? folderData?.map((folder) => folder._id)
      : [];
    setSelectedFolders(allFolderIds);
    selectedFoldersState(allFolderIds);
  };

  useEffect(() => {
    const { files, folders } = getFilteredData(folderData, selectedFolders);
    setSelectedFoldersForOptions(folders);
    setSelectedFilesForOptions(files);

    return () => {
      setSelectedFoldersForOptions([]);
      setSelectedFilesForOptions([]);
    };
  }, [selectedFolders, folderData]);

  const handleDeleteSelected = () => {
    setFolderData((prev) =>
      prev.filter((folder) => !selectedFolders.includes(folder._id))
    );
    setSelectedFolders([]);
  };

  const handleNavigate = (id, mimetype) => {
    if (
      mimetype === "Folder" ||
      mimetype === "Subscriptions" ||
      mimetype === "Shared"
    ) {
      navigate(`/${reference_Id}/directories/${id}`);
    }
  };

  const handleFileSize = ({ mimetype, size }) => {
    let totalSize;
    const fileSizeKB = (size / 1024).toFixed(2);
    const fileSizeMB = (size / (1024 * 1024)).toFixed(2);
    if (
      mimetype === "Folder" ||
      mimetype === "Subscriptions" ||
      mimetype === "Shared"
    ) {
      return size;
    }

    if (size > 1024) {
      totalSize = `${fileSizeMB} mb`;
    } else {
      totalSize = `${fileSizeKB} kb`;
    }

    return totalSize;
  };

  const renderIcon = (mimetype) => {
    switch (mimetype) {
      case "Folder":
      case "Subscriptions":
        return <FolderOpenIcon />;
      case "Shared":
        return <KeyIcon />;
      default:
        return <InsertDriveFileOutlinedIcon />;
    }
  };

  const handleCopyToClipboard = (folder) => {
    if (folder.mimetype === "Shared") {
      navigator.clipboard
        .writeText(folder.secreteCode)
        .then(() => {
          setCopied(true); // Show snackbar
        })
        .catch((error) => {
          console.error("Failed to copy text: ", error);
        });
    }
  };

  const renderStatus = ({ mimetype, url }) => {
    if (
      mimetype !== "Folder" ||
      mimetype !== "Subscriptions" ||
      mimetype !== "Shared"
    ) {
      if (url === "fileUrl") {
        return <CircularProgress size={24} />;
      } else {
        return <CheckCircleOutlineOutlinedIcon />;
      }
    }
  };

  const handleCloseSnackbar = () => {
    setCopied(false);
  };
  //   background:{
  //     default:"rgb(33,37,39)",
  //     paper:'rgb(41,44,49)'
  // },
  const getCellStyles = (isDarkMode) => ({
    backgroundColor: isDarkMode ? "rgb(33,37,39)" : "#fff",
    color: isDarkMode ? "white" : "black",
  });

  const toggleDarkModeParent = () => {
    dispatch(toggleDarkMode());
    setIsDarkModeParent((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  return (
    <div
      className={`newlist-container ${isDarkMode ? "dark-mode" : ""}`}
      style={{
        color: isDarkMode ? "tranparent" : "black",
        background: isDarkMode ? "rgb(33,37,39)" : "#fff",
        border: '0.1px solid #ccc'
      }}
    >
      <div className="files">
        <TableContainer
          component={Paper}
          sx={{ width: "100%", borderRadius: "none", }}
        >
          <Table >
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" sx={getCellStyles(isDarkMode)}>
                  <Checkbox
                    sx={getCellStyles(isDarkMode)}
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
                </TableCell >
                {[
                  "Status",
                  "Folder",
                  "Name",
                  "Mime Type",
                  "Items",
                  "Last Modified",
                ].map((header) => (
                  <TableCell key={header} sx={getCellStyles(isDarkMode)}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {status === "loading" && (
                <TableRow>
                  <TableCell
                    sx={getCellStyles(isDarkMode)}
                    colSpan={12}
                    align="center"
                  >
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              )}
              {status === "failed" && (
                <TableRow>
                  <TableCell
                    sx={getCellStyles(isDarkMode)}
                    colSpan={12}
                    align="center"
                  >
                    <Typography color="error">
                      {error || "Failed to load folders"}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {status === "succeeded" && folderData?.length > 0
                ? folderData.map((folder) => (
                    <TableRow
                      key={folder._id}
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
                      <TableCell
                        sx={getCellStyles(isDarkMode)}
                        padding="checkbox"
                      >
                        <Checkbox
                          sx={getCellStyles(isDarkMode)}
                          checked={selectedFolders.includes(folder._id)}
                          onChange={() => toggleFolderSelection(folder._id)}
                        />
                      </TableCell>
                      <TableCell sx={getCellStyles(isDarkMode)}>
                        {renderStatus(folder)}
                      </TableCell>
                      <TableCell
                        sx={{
                          ...getCellStyles(isDarkMode),
                          cursor:
                            folder.mimetype === "Shared"
                              ? "pointer"
                              : "default",
                        }}
                        onClick={() => handleCopyToClipboard(folder)}
                      >
                        {renderIcon(folder.mimetype)}
                      </TableCell>
                      <TableCell
                        sx={{
                          ...getCellStyles(isDarkMode),
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          handleNavigate(folder._id, folder.mimetype)
                        }
                      >
                        {folder.name}
                      </TableCell>
                      <TableCell sx={getCellStyles(isDarkMode)}>
                        {folder.mimetype}
                      </TableCell>
                      <TableCell sx={getCellStyles(isDarkMode)}>
                        {handleFileSize(folder)}
                      </TableCell>
                      <TableCell sx={getCellStyles(isDarkMode)}>
                        {new Date(folder.lastUpdated).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))
                : status === "succeeded" &&
                  folderData?.length === 0 && (
                    <TableRow>
                      <TableCell
                        sx={getCellStyles(isDarkMode)}
                        colSpan={12}
                        align="center"
                      >
                        <Typography>No folders available</Typography>
                      </TableCell>
                    </TableRow>
                  )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {status === "failed" && (
        <div className="reload-btn-container">
          <Button onClick={handleReload} sx={{ m: 2 }} variant="outlined">
            Reload
          </Button>
        </div>
      )}

      <Snackbar
        open={copied}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Secret copied to clipboard"
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );
}

export default NewList;
