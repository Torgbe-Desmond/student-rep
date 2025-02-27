import React, { useState, useEffect, useCallback } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilesAndFolders,
  getAdirectory,
  getAllFolders,
  getMainDirectories,
} from "../Features/WorkSpace";
import { restoreBreadCrumbs, setCurrentDirectory } from "../Features/PathSlice";
import handleStack from "../components/HandleStack/HandleStack";
import SearchBarWithActions from "../components/SearchBarWithActions/SearchBarWithActions";
import "../index.css";
import { Box, useMediaQuery } from "@mui/material";
import BasicSpeedDial from "../components/SpeedDial/SpeedDial";
import UploadStatus from "../components/UploadStatus/UploadStatus";

const ProtectRoutes = ({
  token,
  reference_Id,
  directoryId,
  dispatch,
  selectedItems,
  setSelectedItems,
  folders,
  filteredData,
  setFilteredData,
  selectedFilesForOptions,
  setSelectedFilesForOptions,
  selectedFoldersForOptions,
  setSelectedFoldersForOptions,
  breadCrumbs,
  authorizeStatus,
  handleReload,
  handleAction,
  isDarkMode,
}) => {

  useEffect(() => handleReload(), [handleReload]);

  const sharedProps = {
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
  };

  let component;
  if (token) {
    component = (
      <Box className="app">
      

        <Box className="main">
          <Outlet context={sharedProps} />
        </Box>

        <Box>
          <BasicSpeedDial
            selectedItems={selectedItems}
            selectedFilesForOptions={selectedFilesForOptions}
            selectedFoldersForOptions={selectedFoldersForOptions}
          />
        </Box>
        
      </Box>
    );
  } else {
    component = <Navigate to="/" />;
  }

  return component;
};

export default ProtectRoutes;
