import React, { useState, useEffect, useCallback } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import "../index.css";
import { Box } from "@mui/material";
import BasicSpeedDial from "../components/SpeedDial/SpeedDial";

const ProtectRoutes = ({
  token,
  selectedItems,
  setSelectedItems,
  filteredData,
  setFilteredData,
  selectedFilesForOptions,
  setSelectedFilesForOptions,
  selectedFoldersForOptions,
  setSelectedFoldersForOptions,
  breadCrumbs,
  handleReload,
  isDarkMode,
  setSearchTerm,
}) => {

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
    handleReload,
    setSearchTerm,
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
