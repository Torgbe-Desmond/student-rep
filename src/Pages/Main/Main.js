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

function Main() {
  const [selectedItems, setSelectedItems] = useState([]);
  const { reference_Id, directoryId } = useParams();
  const dispatch = useDispatch();
  const { folders } = useSelector(state => state.work);
  const [_folders, setFolders] = useState([]);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedFilesForOptions, setSelectedFilesForOptions] = useState([]);
  const [selectedFoldersForOptions, setSelectedFoldersForOptions] = useState([]);
  const breadCrumb = useSelector(state => state.path.breadCrumbs);
  const [breadCrumbs, setBreadCrumbs] = useState([]);
  const { status } = JSON.parse(localStorage.getItem('Unauthorized')) || {};
  const [authorizeStatus, setAuthorizeStatus] = useState(status);
  const isDarkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    setBreadCrumbs(breadCrumb);
  }, [breadCrumb]);

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
  }, [dispatch, reference_Id, directoryId, status]);

  const handleAction = useCallback(
    (actionType) => handleStack(actionType, dispatch),
    [dispatch]
  );

  useEffect(() => {
    setAuthorizeStatus(status);
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
    <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <SearchBarWithActions
        folderData={_folders}
        setFilteredData={setFilteredData}
        selectedItems={selectedItems}
        selectedFilesForOptions={selectedFilesForOptions}
        selectedFoldersForOptions={selectedFoldersForOptions}
      />

      <Breadcrumb breadcrumbs={breadCrumbs} />

      <NewList
        initialFolderData={filteredData}
        selectedFoldersState={setSelectedItems}
        setSelectedFilesForOptions={setSelectedFilesForOptions}
        setSelectedFoldersForOptions={setSelectedFoldersForOptions}
        handleReload={handleReload}
      />

      <UploadStatus reference_Id={reference_Id} />

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
