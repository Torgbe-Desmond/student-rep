import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, ButtonGroup, Tabs, Tab, useMediaQuery } from "@mui/material";
import ProtectRoutes from "../../Layout/ProtectRoutes";
import SearchBarWithActions from "../SearchBarWithActions/SearchBarWithActions";
import { useDispatch, useSelector } from "react-redux";
import { restoreBreadCrumbs, setCurrentDirectory } from "../../Features/PathSlice";
import { clearFilesAndFolders, getAdirectory, getAllFolders, getMainDirectories } from "../../Features/WorkSpace";
import handleStack from "../HandleStack/HandleStack";
import { useParams } from "react-router-dom";
import Public from "../Public/Public";

const ButtonTabComponent = () => {
  const [value, setValue] = useState(0);
  const handleChange = (newValue) => setValue(newValue);

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
  const isMobile = useMediaQuery("(max-width: 600px)");

  const handleReload = useCallback(() => {
    dispatch(getAllFolders({ reference_Id }));
    if (reference_Id && directoryId) {
      dispatch(getAdirectory({ reference_Id, directoryId }));
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
    <Box sx={{ width: "100%", position: "fixed", bottom:0 }}>
      {isMobile ? (
        <ButtonGroup fullWidth>
          <Button onClick={() => handleChange(0)} variant={value === 0 ? "contained" : "outlined"}>Local</Button>
          <Button onClick={() => handleChange(1)} variant={value === 1 ? "contained" : "outlined"}>Public</Button>
        </ButtonGroup>
      ) : (
        <Tabs value={value} onChange={(e, newValue) => handleChange(newValue)} centered>
          <Tab label="Local" />
          <Tab label="Public" />
        </Tabs>
      )}
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
          />
        )}
        {value === 1 && <Public />}
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

export default ButtonTabComponent;
