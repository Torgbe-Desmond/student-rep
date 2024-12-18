import React, { useState, useEffect, useCallback } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearFilesAndFolders,
  getAdirectory,
  getAllFolders,
  getMainDirectories,
} from '../Features/WorkSpace';
import { restoreBreadCrumbs, setCurrentDirectory } from '../Features/PathSlice';
import handleStack from '../components/HandleStack/HandleStack';
import SearchBarWithActions from '../components/SearchBarWithActions/SearchBarWithActions';
import '../index.css'
import { Box } from '@mui/material';
import BasicSpeedDial from '../components/SpeedDial/SpeedDial';
import Breadcrumb from '../components/BreadCrumb/BreadCrumb';
import UploadStatus from '../components/UploadStatus/UploadStatus';

const ProtectRoutes = () => {
  const token = localStorage.getItem('token');
  const { reference_Id, directoryId } = useParams();
  const dispatch = useDispatch();

  // Shared state
  const [selectedItems, setSelectedItems] = useState([]);
  const { folders } = useSelector((state) => state.work);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedFilesForOptions, setSelectedFilesForOptions] = useState([]);
  const [selectedFoldersForOptions, setSelectedFoldersForOptions] = useState([]);
  const breadCrumb = useSelector((state) => state.path.breadCrumbs);
  const [breadCrumbs, setBreadCrumbs] = useState([]);
  const [authorizeStatus, setAuthorizeStatus] = useState(
    JSON.parse(localStorage.getItem('Unauthorized'))?.status
  );
  const isDarkMode = useSelector((state) => state.theme.darkMode);

  // Restore breadcrumbs and load folders
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
      handleAction('SessionExpiredModal');
    }
  }, [dispatch, reference_Id, directoryId, authorizeStatus]);

  const handleAction = useCallback(
    (actionType) => handleStack(actionType, dispatch),
    [dispatch]
  );

  useEffect(() => {
    setBreadCrumbs(breadCrumb);
  }, [breadCrumb]);

  useEffect(() => {
    setAuthorizeStatus(JSON.parse(localStorage.getItem('Unauthorized'))?.status);
  }, []);

  useEffect(() => {
    handleReload();
    return () => {
      dispatch(clearFilesAndFolders());
    };
  }, [reference_Id, directoryId, dispatch, handleReload]);

  useEffect(() => {
    setFilteredData(folders);
  }, [folders]);

  // Pass shared state and handlers to Outlet
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


  let component 
  if(token){
      component = (
        <Box className="app">
          <Box className='header'>
             <SearchBarWithActions
                folderData={filteredData}
                setFilteredData={setFilteredData}
                selectedItems={selectedItems}
                selectedFilesForOptions={selectedFilesForOptions}
                selectedFoldersForOptions={selectedFoldersForOptions}
               />
          </Box>


           <Box className='main'>
              <Outlet context={sharedProps} />
           </Box>

          <Box>
            <BasicSpeedDial
              selectedItems={selectedItems}
              selectedFilesForOptions={selectedFilesForOptions}
              selectedFoldersForOptions={selectedFoldersForOptions}
            />          
          </Box>

          <UploadStatus 
          reference_Id={reference_Id}
          authorizeStatus={authorizeStatus} />
           
        </Box>
      )
  } else {
     component = (
        <Navigate to="/" />
     )
  } 


  return component
};

export default ProtectRoutes;
