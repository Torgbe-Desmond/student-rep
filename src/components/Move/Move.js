import React, { useState, useEffect } from "react";
import {
  Button,
  CircularProgress,
  TextField,
  Snackbar,
  Alert,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMoveItemsArray,
  getAllFolders,
  moveFile,
  moveFolder,
} from "../../Features/WorkSpace";
import { handleStackClear } from "../HandleStack/HandleStack";
import "./Move.css";

// Define the dark and light theme using MUI's createThem

function Move() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMoveFiles, setSelectedMoveFiles] = useState([]);
  const [selectedFolders, setSelectedFolders] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const {
    moveItemsArray,
    folders,
    selectedFolders: selectedFolderList,
  } = useSelector((state) => state.work);
  const currentDirectory = useSelector((state) => state.path.currentDirectory);
  const reference_Id = localStorage.getItem("reference_Id");
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    dispatch(getAllFolders({ reference_Id }));
  }, [dispatch, reference_Id]);

  const filterFoldersByType = (folders, condition) => {
    return folders.filter(condition);
  };

  useEffect(() => {
    const foldersToMove = moveItemsArray?.filter(
      (folder) => !selectedFolderList.includes(folder.path)
    );
    setSelectedMoveFiles(foldersToMove);
  }, [moveItemsArray, selectedFolderList]);

  useEffect(() => {
    const onlyFiles = filterFoldersByType(
      folders,
      (folder) =>
        selectedFolderList.includes(folder._id) &&
        folder.mimetype !== "Folder" &&
        folder.mimetype !== "Subscriptions" &&
        folder.mimetype !== "Shared"
    );

    const onlyFolders = filterFoldersByType(
      folders,
      (folder) =>
        selectedFolderList.includes(folder._id) &&
        (folder.mimetype === "Folder" ||
          folder.mimetype === "Subscriptions" ||
          folder.mimetype === "Shared")
    );

    setSelectedFiles(onlyFiles);
    setSelectedFolders(onlyFolders);
  }, [folders, selectedFolderList]);

  const moveItems = (folderId, files, folders) => {
    const promises = [];

    if (files.length > 0) {
      promises.push(
        dispatch(
          moveFile({
            reference_Id,
            DirectoriesToMoveFileTo: [folderId],
            FileIds: files,
            DirectoryFileIsMoveFrom: currentDirectory,
          })
        )
      );
    }

    if (folders.length > 0) {
      promises.push(
        dispatch(
          moveFolder({
            reference_Id,
            directoriesToMove: folders,
            directoryToMoveTo: [folderId],
          })
        )
      );
    }

    return Promise.all(promises);
  };

  // Handle move action
  const handleMoveAction = () => {
    if (match.length !== 1) {
      setSnackbar({
        open: true,
        message: "Please specify exactly one folder to move the items to.",
        severity: "error",
      });
      return;
    }

    const folderId = match[0].path;
    if (!folderId) {
      setSnackbar({
        open: true,
        message: "Invalid folder ID.",
        severity: "error",
      });
      return;
    }

    setIsLoading(true);
    moveItems(folderId, selectedFiles, selectedFolders).finally(() => {
      setIsLoading(false);
      handleStackClear(dispatch);
      setSnackbar({
        open: true,
        message: "Items moved successfully!",
        severity: "success",
      });
    });
  };

  const filteredFolders = search
    ? selectedMoveFiles.filter((file) =>
        file.label.toLowerCase().includes(search.toLowerCase())
      )
    : selectedMoveFiles;

  const match = name
    ? selectedMoveFiles.filter(
        (file) => file.label.toLowerCase() === name.toLowerCase()
      )
    : [];

  return (
    <div className={`$ move-overlay `}>
      <div className={`move-modal ${isDarkMode ? "switch" : "light"}`}>
        {isLoading ? (
          <LinearProgress />
        ) : (
          <>
            <div
              className={`top-move-modal ${isDarkMode ? "switch" : "light"}`}
            >
              <TextField
                sx={{
                  color: isDarkMode ? "#FFF" : "",
                  "& .MuiInputBase-input": {
                    color: isDarkMode ? "#FFF" : "",
                    background: isDarkMode ? "" : "",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: isDarkMode ? "#FFF" : "",
                  },
                }}
                type="text"
                className="move-search-input"
                placeholder="Search folders"
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="available-folders">
                <List>
                  {filteredFolders.map((folder) => (
                    <ListItem key={folder._id}>
                      <ListItemAvatar>
                        <Avatar>
                          <FolderOpenOutlinedIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        sx={{
                          color: isDarkMode ? "switch" : "light",
                          maxWidth: "300px",
                          width: "300px",
                          overflowY: "scroll",
                        }}
                        primary={folder.label}
                      />
                    </ListItem>
                  ))}
                </List>
              </div>
            </div>
            <div className="input-vv">
              <TextField
                sx={{
                  color: isDarkMode ? "#FFF" : "",
                  "& .MuiInputBase-input": {
                    color: isDarkMode ? "#FFF" : "",
                    background: isDarkMode ? "" : "",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: isDarkMode ? "#FFF" : "",
                  },
                }}
                type="text"
                className="move-search"
                placeholder="Type folder name to move"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </>
        )}
        <div className="bottom-move-modal">
          <div className="move-button-container">
            <Button
              variant="contained"
              disabled={match.length !== 1 || isLoading}
              onClick={handleMoveAction}
              className="move-btn"
            >
              Move
            </Button>
            <Button
              variant="contained"
              onClick={() => handleStackClear(dispatch)}
              disabled={isLoading}
              className="move-btn"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Move;
