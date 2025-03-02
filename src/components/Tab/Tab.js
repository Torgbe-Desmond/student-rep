import React, { useCallback, useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  useMediaQuery,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import ProtectRoutes from "../../Layout/ProtectRoutes";
import SearchBarWithActions from "../SearchBarWithActions/SearchBarWithActions";
import { useDispatch, useSelector } from "react-redux";
import {
  restoreBreadCrumbs,
  setCurrentDirectory,
} from "../../Features/PathSlice";
import {
  clearFilesAndFolders,
  clearSearchTerm,
  getAdirectory,
  getAllFolders,
  getMainDirectories,
  getSearchHistory,
  searchFilesOrDirectories,
} from "../../Features/WorkSpace";
import handleStack from "../HandleStack/HandleStack";
import { useParams } from "react-router-dom";
import Public from "../Public/Public";
import "./Tab.css";
import ClearIcon from "@mui/icons-material/Clear";

const TabComponent = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => setValue(newValue);

  const searchResults = useSelector((state) => state.work.searchResults);
  const toggelSearch = useSelector((state) => state.stack.search);
  const token = localStorage.getItem("token");
  const { reference_Id, directoryId } = useParams();
  const dispatch = useDispatch();
  const { folders } = useSelector((state) => state.work);
  const breadCrumb = useSelector((state) => state.path.breadCrumbs);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedFilesForOptions, setSelectedFilesForOptions] = useState([]);
  const [selectedFoldersForOptions, setSelectedFoldersForOptions] = useState(
    []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(folders);
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  // Reload folders on reference_Id or directoryId change
  const handleReload = useCallback(() => {
    dispatch(getAllFolders({ reference_Id }));
    if (reference_Id && directoryId) {
      dispatch(getAdirectory({ reference_Id, directoryId }));
      dispatch(setCurrentDirectory(directoryId));
    } else if (reference_Id) {
      dispatch(getMainDirectories({ reference_Id }));
    }
    dispatch(restoreBreadCrumbs());
  }, [dispatch, reference_Id, directoryId]);

  useEffect(() => {
    // dispatch(getAllFolders({ reference_Id }));
    if (reference_Id && directoryId) {
      dispatch(getAdirectory({ reference_Id, directoryId }));
      dispatch(setCurrentDirectory(directoryId));
    } else if (reference_Id) {
      dispatch(getMainDirectories({ reference_Id }));
    }
    return () => {
      dispatch(clearFilesAndFolders());
    };
  }, [reference_Id, directoryId, dispatch]);

  // Handles searching with debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm) {
        dispatch(searchFilesOrDirectories({ reference_Id, searchTerm }));
        dispatch(getSearchHistory({ reference_Id }));
      } else {
        dispatch(clearSearchTerm());
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, dispatch, reference_Id]);

  // Clears search input and results
  const handleClear = () => {
    setSearchTerm("");
    dispatch(clearSearchTerm());
  };

  return (
    <Box sx={{ width: "100%", position: "sticky" }}>
      <div className="local-search">
        {/* {toggelSearch ? (
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
            }}
          />
        ) : (
          // <Tabs value={value} onChange={handleChange} centered>
          //   <Tab label="Local" />
          //   <Tab label="Public" />
          // </Tabs>
        )} */}
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Local" />
          <Tab label="Public" />
        </Tabs>
      </div>

      <Box>
        {value === 0 && (
          <ProtectRoutes
            token={token}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            filteredData={filteredData}
            setFilteredData={setFilteredData}
            selectedFilesForOptions={selectedFilesForOptions}
            setSelectedFilesForOptions={setSelectedFilesForOptions}
            selectedFoldersForOptions={selectedFoldersForOptions}
            setSelectedFoldersForOptions={setSelectedFoldersForOptions}
            breadCrumbs={breadCrumb}
            handleReload={handleReload}
            isDarkMode={isDarkMode}
          />
        )}
        {value === 1 && <Public />}
      </Box>

      <Box className="header">
        <SearchBarWithActions
          folderData={folders}
          setFilteredData={setFilteredData}
          setSelectedItems={setSelectedItems}
          selectedItems={selectedItems}
          selectedFilesForOptions={selectedFilesForOptions}
          selectedFoldersForOptions={selectedFoldersForOptions}
        />
      </Box>
    </Box>
  );
};

export default TabComponent;
