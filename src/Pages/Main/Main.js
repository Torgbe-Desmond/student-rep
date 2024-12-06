import React, { useCallback, useEffect, useState } from 'react';
import './Main.css';
import SearchBarWithActions from '../../components/SearchBarWithActions/SearchBarWithActions';
import NewList from '../../components/NewList/NewList';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearFilesAndFolders, getAdirectory, getAllFolders, getMainDirectories } from '../../Features/WorkSpace';
import Breadcrumb from '../../components/BreadCrumb/BreadCrumb';
import { setCurrentDirectory } from '../../Features/PathSlice';
import handleStack from '../../components/HandleStack/HandleStack';
import UploadStatus from '../../components/UploadStatus/UploadStatus';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box } from '@mui/material';
import BasicSpeedDial from '../../components/SpeedDial/SpeedDial';


function Main() {
  const [selectedItems, setSelectedItems] = useState([]);
  const { reference_Id, directoryId } = useParams();
  const dispatch = useDispatch();
  const { folders } = useSelector(state => state.work);
  const [_folders, setFolders] = useState([]);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedFilesForOptions, setSelectedFilesForOptions] = useState([]);
  const [selectedFoldersForOptions, setSelectedFoldersForOptions] = useState([]);
  const [breadCrumbs,setBreadCrumbs] = useState([])
  const { status } = JSON.parse(localStorage.getItem('Unauthorized')) || {};
  const [authorizeStatus,setAuthorizeStatus ] = useState(status)
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(()=>{
    const savedBreadCrumbs = JSON.parse(localStorage.getItem('breadCrumbs'));
    setBreadCrumbs(savedBreadCrumbs)
  },[localStorage.getItem('breadCrumbs')])


  const handleReload = useCallback(() => {
    if (reference_Id && directoryId) {
      dispatch(getAdirectory({ reference_Id, directoryId }));
      dispatch(setCurrentDirectory(directoryId));
    } else if (reference_Id) {
      dispatch(getMainDirectories({ reference_Id }));
      dispatch(getAllFolders({ reference_Id }));
    }
    if (authorizeStatus){
        handleAction('SessionExpiredModal');
    }
  }, [dispatch, reference_Id, directoryId,status]);

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

  return (
    <div className="app-container">
      <SearchBarWithActions 
        folderData={_folders} 
        setFilteredData={setFilteredData} 
        selectedItems={selectedItems} 
        selectedFilesForOptions={selectedFilesForOptions}
        selectedFoldersForOptions={selectedFoldersForOptions}
      />

      {/* <UploadStatus/> */}


      <Breadcrumb breadcrumbs={breadCrumbs}
       />



      <NewList 
        initialFolderData={filteredData} 
        selectedFoldersState={setSelectedItems}
        setSelectedFilesForOptions={setSelectedFilesForOptions}
        setSelectedFoldersForOptions={setSelectedFoldersForOptions}
        handleReload={handleReload}
      />

      <BasicSpeedDial
        selectedItems={selectedItems} 
        selectedFilesForOptions={selectedFilesForOptions}
        selectedFoldersForOptions={selectedFoldersForOptions}
      />
    </div>
  );
}

export default Main;

