import React, { useCallback, useEffect, useState } from "react";
import { Tabs, Tab, Box, useMediaQuery } from "@mui/material";
import ProtectRoutes from "../../Layout/ProtectRoutes";
import SearchBarWithActions from "../SearchBarWithActions/SearchBarWithActions";
import { useDispatch, useSelector } from "react-redux";
import { restoreBreadCrumbs, setCurrentDirectory } from "../../Features/PathSlice";
import { clearFilesAndFolders, getAdirectory, getAllFolders, getMainDirectories } from "../../Features/WorkSpace";
import handleStack from "../HandleStack/HandleStack";
import { useParams } from "react-router-dom";
import Public from "../Public/Public";

const TabComponent = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => setValue(newValue);

  const token = localStorage.getItem("token");
  const { reference_Id, directoryId } = useParams();
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState([]);
  const { folders } = useSelector((state) => state.work);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedFilesForOptions, setSelectedFilesForOptions] = useState([]);
  const [selectedFoldersForOptions, setSelectedFoldersForOptions] = useState([]);
  const breadCrumb = useSelector((state) => state.path.breadCrumbs);
  const [breadCrumbs, setBreadCrumbs] = useState([]);
  const [authorizeStatus, setAuthorizeStatus] = useState(
    JSON.parse(localStorage.getItem("Unauthorized"))?.status
  );
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const handleReload = useCallback(() => {
    dispatch(restoreBreadCrumbs());
    dispatch(getAllFolders({ reference_Id }));
    if (reference_Id && directoryId) {
      dispatch(getAdirectory({ reference_Id, directoryId }));
      dispatch(setCurrentDirectory(directoryId));
    } else if (reference_Id) {
      dispatch(getMainDirectories({ reference_Id }));
    }
    if (authorizeStatus) {
      handleAction("SessionExpiredModal");
    }
  }, [dispatch, reference_Id, directoryId, authorizeStatus]);

  const handleAction = useCallback(
    (actionType) => handleStack(actionType, dispatch),
    [dispatch]
  );

  useEffect(() => setBreadCrumbs(breadCrumb), [breadCrumb]);
  useEffect(() => setAuthorizeStatus(JSON.parse(localStorage.getItem("Unauthorized"))?.status), []);
  
  useEffect(() => {
    handleReload();
    return () => dispatch(clearFilesAndFolders());
  }, [reference_Id, directoryId, dispatch, handleReload]);

  useEffect(() => setFilteredData(folders), [folders]);

  return (
    <Box sx={{ width: "100%", position: "sticky" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Local" />
        <Tab label="Public" />
        {/* <Tab label="Settings" /> */}
      </Tabs>
      <Box>
        {value === 0 && (
          <ProtectRoutes
            token={token}
            reference_Id={reference_Id}
            directoryId={directoryId}
            dispatch={dispatch}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            folders={folders}
            filteredData={filteredData}
            setFilteredData={setFilteredData}
            selectedFilesForOptions={selectedFilesForOptions}
            setSelectedFilesForOptions={setSelectedFilesForOptions}
            selectedFoldersForOptions={selectedFoldersForOptions}
            setSelectedFoldersForOptions={setSelectedFoldersForOptions}
            breadCrumbs={breadCrumbs}
            authorizeStatus={authorizeStatus}
            handleReload={handleReload}
            handleAction={handleAction}
            isDarkMode={isDarkMode}
          />
        )}
        {value === 1 && <Public/>}
        {/* {value === 2 && <Box><h2>Settings Content Goes Here</h2></Box>} */}
      </Box>
      <Box className="header">
        <SearchBarWithActions
          folderData={folders}
          setFilteredData={setFilteredData}
          selectedItems={selectedItems}
          selectedFilesForOptions={selectedFilesForOptions}
          selectedFoldersForOptions={selectedFoldersForOptions}
        />
      </Box>
    </Box>
  );
};

export default TabComponent;
