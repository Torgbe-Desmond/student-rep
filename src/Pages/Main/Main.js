import React, { useEffect, useState } from "react";
import "./Main.css";
import NewList from "../../components/NewList/NewList";
import { useOutletContext } from "react-router-dom";
import Breadcrumb from "../../components/BreadCrumb/BreadCrumb";
import { clearSearchTerm } from "../../Features/WorkSpace";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import TableRowsIcon from "@mui/icons-material/TableRows";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import SearchIcon from "@mui/icons-material/Search";
import SwipeableTemporaryDrawer from "../../components/Drawer/Drawer";
import CustomDrawer from "../../components/Drawer/Drawer";
import Switch from "../../components/Switch/Switch";
import SwitchLabel from "../../components/Switch/Switch";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import HandleList from "../../components/HandleList/HandleList";
import Status from "../../components/StatusLogger/StatusLogger";
function Main() {
  const dispatch = useDispatch();
  const { folders } = useSelector((state) => state.work);
  const [searchTerm, setSearchTerm] = useState("");
  const [separateFiles, setSeparateFiles] = useState(null);
  const [separateFolders, setSeparateFolders] = useState(null);
  const [tableLayout, setTableLayout] = useState("row");
  const [state, setState] = React.useState(false);
  const [details, setDetails] = useState(null);
  const [open, setOpen] = useState(false);
  const [notEmpty, setNotEmpty] = useState([]);
  const { status, error } = useSelector((state) => state.work);

  console.log("details", details);
  // Handles searching with debounce
  useEffect(() => {
    let searchedData = folders?.filter((st) =>
      st.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
    setFilteredData(searchedData);
  }, [searchTerm]);

  // Clears search input and results
  const handleClear = () => {
    setSearchTerm("");
    dispatch(clearSearchTerm());
  };
  const {
    isDarkMode,
    selectedItems,
    setSelectedItems,
    filteredData,
    setFilteredData,
    selectedFilesForOptions,
    setSelectedFilesForOptions,
    selectedFoldersForOptions,
    setSelectedFoldersForOptions,
    breadCrumbs,
    authorizeStatus,
    handleReload,
  } = useOutletContext();

  const separateFoldersAndFiles = (folderData) => ({
    files: folderData?.filter(
      (folder) =>
        folder.mimetype !== "Folder" && folder.mimetype !== "Subscriptions"
    ),
    folders: folderData?.filter(
      (folder) =>
        folder.mimetype === "Folder" || folder.mimetype === "Subscriptions"
    ),
  });

  useEffect(() => {
    const { files, folders } = separateFoldersAndFiles(filteredData);
    setSeparateFiles(files?.length > 0 ? files : []);
    setSeparateFolders(folders?.length > 0 ? folders : []);
  }, [filteredData]);

  return (
    <div className={`app-container ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="local-search">
        <TextField
          sx={{
            color: isDarkMode ? "#FFF" : "",
            "& .MuiInputBase-input": {
              color: isDarkMode ? "#FFF" : "",
            },
            "& .MuiInputBase-input::placeholder": {
              color: isDarkMode ? "#FFF" : "",
            },
          }}
          className="public-input"
          placeholder="Search files by name"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton onClick={handleClear}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
            startAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClear}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {/* {tableLayout === "column" ? (
          <TableRowsIcon
            sx={{ cursor: "pointer", fontSize: "24px" }}
            onClick={() => setTableLayout("row")}
          />
        ) : (
          <ViewModuleIcon
            sx={{ cursor: "pointer", fontSize: "24px" }}
            onClick={() => setTableLayout("column")}
          />
        )} */}
      </div>

      <Breadcrumb
        setSearchTerm={setSearchTerm}
        isDarkMode={isDarkMode}
        breadcrumbs={breadCrumbs}
      />

      <HandleList
        title="Folders"
        data={separateFolders}
        tableLayout={tableLayout}
        isDarkMode={isDarkMode}
        setOpen={setOpen}
        setDetails={setDetails}
        setSelectedItems={setSelectedItems}
        setSelectedFilesForOptions={setSelectedFilesForOptions}
        setSelectedFoldersForOptions={setSelectedFoldersForOptions}
        handleReload={handleReload}
      />

      <HandleList
        title="Files"
        data={separateFiles}
        tableLayout={tableLayout}
        isDarkMode={isDarkMode}
        setOpen={setOpen}
        setDetails={setDetails}
        setSelectedItems={setSelectedItems}
        setSelectedFilesForOptions={setSelectedFilesForOptions}
        setSelectedFoldersForOptions={setSelectedFoldersForOptions}
        handleReload={handleReload}
      />

      <Status isLoading={status} error={error} />

      {details && (
        <div>
          <CustomDrawer
            open={open}
            details={details}
            SwitchLabel={SwitchLabel}
            onClose={() => setOpen(false)}
            anchor="right"
          />
        </div>
      )}
    </div>
  );
}

export default Main;
