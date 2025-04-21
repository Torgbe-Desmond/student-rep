import React, { useEffect, useRef, useState } from "react";
import { CircularProgress, Button, Snackbar, IconButton } from "@mui/material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import KeyIcon from "@mui/icons-material/Key";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./NewList.css";
import ReusableTable from "../Table/Table";
import { getBreadCrumb } from "../../Features/PathSlice";
import List from "../List/List";
import Status from "../StatusLogger/StatusLogger";

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
  setOpen,
  setDetails,
  tableLayout,
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
  const [files, setFiles] = useState();
  const [folders, setFolders] = useState();
  const stackState = useSelector((state) => state.stack.stackState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    handleScroll();
  }, [folderData]);

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

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (initialFolderData?.length) {
      setFolderData(initialFolderData);
    }
  }, [initialFolderData]);

  const handleScroll = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
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
    setFiles(files);
    setFolders(folders);

    return () => {
      setSelectedFoldersForOptions([]);
      setSelectedFilesForOptions([]);
    };
  }, [selectedFolders, folderData]);

  const handleNavigate = (directoryId, mimetype) => {
    if (
      mimetype === "Folder" ||
      mimetype === "Subscriptions" ||
      mimetype === "Shared"
    ) {
      dispatch(getBreadCrumb({ reference_Id, directoryId }));
      navigate(`/${reference_Id}/directories/${directoryId}`);
      console.log("entered navigate");
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

  const getCellStyles = (isDarkMode) => ({
    // backgroundColor: isDarkMode ? "rgb(33,37,39)" : "#fff",
    // color: isDarkMode ? "white" : "black",
  });

  return (
    <div className={`newlist-container glass ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="files">
        {tableLayout === "row" ? (
          <ReusableTable
            setOpen={setOpen}
            setDetails={setDetails}
            selectedFolders={selectedFolders}
            setSelectedFolders={setSelectedFolders}
            handleSelectAll={handleSelectAll}
            isLoading={status}
            error={error}
            renderIcon={renderIcon}
            isDarkMode={isDarkMode}
            folderData={folderData}
            toggleFolderSelection={toggleFolderSelection}
            renderStatus={renderStatus}
            handleCopyToClipboard={handleCopyToClipboard}
            getCellStyles={getCellStyles}
            handleNavigate={handleNavigate}
            handleFileSize={handleFileSize}
          />
        ) : (
          <List
            setDetails={setDetails}
            selectedFolders={selectedFolders}
            setSelectedFolders={setSelectedFolders}
            handleSelectAll={handleSelectAll}
            isLoading={status}
            error={error}
            renderIcon={renderIcon}
            isDarkMode={isDarkMode}
            folderData={folderData}
            toggleFolderSelection={toggleFolderSelection}
            renderStatus={renderStatus}
            handleCopyToClipboard={handleCopyToClipboard}
            getCellStyles={getCellStyles}
            handleNavigate={handleNavigate}
            handleFileSize={handleFileSize}
          />
        )}
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
