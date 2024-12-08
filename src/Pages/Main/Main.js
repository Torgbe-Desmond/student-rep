import React, { useCallback, useEffect, useState } from 'react';
import './Main.css';
import SearchBarWithActions from '../../components/SearchBarWithActions/SearchBarWithActions';
import NewList from '../../components/NewList/NewList';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearFilesAndFolders, getAdirectory, getAllFolders, getMainDirectories } from '../../Features/WorkSpace';
import Breadcrumb from '../../components/BreadCrumb/BreadCrumb';
import { restoreBreadCrumbs, setCurrentDirectory } from '../../Features/PathSlice';
import BasicSpeedDial from '../../components/SpeedDial/SpeedDial';
import handleStack from '../../components/HandleStack/HandleStack';
import UploadStatus from '../../components/UploadStatus/UploadStatus';
import SimpleBottomNavigation from '../../components/SimpleBottomNavigation/SimpleBottomNavigation';
import ScrollSearch from '../../components/ScrollSearch/ScrollSearch';
import { AppBar, Box, InputBase, Toolbar } from '@mui/material';

function Main() {
  const [selectedItems, setSelectedItems] = useState([]);
  const { reference_Id, directoryId } = useParams();
  const dispatch = useDispatch();
  const { folders } = useSelector(state => state.work);
  const [_folders, setFolders] = useState([]);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedFilesForOptions, setSelectedFilesForOptions] = useState([]);
  const [selectedFoldersForOptions, setSelectedFoldersForOptions] = useState([]);
  const breadCrumb = useSelector(state=>state.path.breadCrumbs)
  const [breadCrumbs,setBreadCrumbs] = useState([])
  const { status } = JSON.parse(localStorage.getItem('Unauthorized')) || {};
  const [authorizeStatus,setAuthorizeStatus ] = useState(status);
  const [showSearch, setShowSearch] = useState(false);

  
  useEffect(() => {
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(()=>{
    setBreadCrumbs(breadCrumb)
  },[breadCrumb])

  const handleReload = useCallback(() => {
      dispatch(restoreBreadCrumbs())
      dispatch(getAllFolders({ reference_Id }));
      if (reference_Id && directoryId) {
        dispatch(getAdirectory({ reference_Id, directoryId }));
        dispatch(setCurrentDirectory(directoryId));
      } else if (reference_Id) {
        dispatch(getMainDirectories({ reference_Id }));
      }
      if (authorizeStatus){
          handleAction('SessionExpiredModal');
      }
  }, [dispatch, reference_Id, directoryId , status]);

  const handleAction = useCallback(
    (actionType) => handleStack(actionType, dispatch),
    [dispatch]
  );

  useEffect(() => {
    setAuthorizeStatus(status)
  }, [status]);

  useEffect(() => {
    handleReload();
    return () => {
      dispatch(clearFilesAndFolders());
    };
  }, [reference_Id, directoryId, dispatch, handleReload]);

  useEffect(() => {
    setFolders(folders);
    setFilteredData(folders);
  }, [folders]);


  const handleScroll = () => {
    console.log('scrolling')
    const scrollThreshold = 150; // Show search bar after scrolling 150px
    if (window.scrollY > scrollThreshold) {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  };

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="app-container">
     <Box sx={{ position: 'fixed', zIndex: 1, }}>
     <SearchBarWithActions 
        folderData={_folders} 
        setFilteredData={setFilteredData} 
        selectedItems={selectedItems} 
        selectedFilesForOptions={selectedFilesForOptions}
        selectedFoldersForOptions={selectedFoldersForOptions}
      />  
     </Box>

     <div className='top-app-container'>
      
      <Breadcrumb 
        breadcrumbs={breadCrumbs}
       />

      <NewList 
        initialFolderData={filteredData} 
        selectedFoldersState={setSelectedItems}
        setSelectedFilesForOptions={setSelectedFilesForOptions}
        setSelectedFoldersForOptions={setSelectedFoldersForOptions}
        handleReload={handleReload}
      />

     </div>

      <UploadStatus
        reference_Id={reference_Id}
      />

      <BasicSpeedDial
        selectedItems={selectedItems} 
        selectedFilesForOptions={selectedFilesForOptions}
        selectedFoldersForOptions={selectedFoldersForOptions}
      />

      <SimpleBottomNavigation />
    </div>
  );
}

export default Main;

