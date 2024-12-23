import React from 'react';
import './Main.css';
import NewList from '../../components/NewList/NewList';
import { useOutletContext } from 'react-router-dom';
import Breadcrumb from '../../components/BreadCrumb/BreadCrumb';
import UploadStatus from '../../components/UploadStatus/UploadStatus';
import BasicSpeedDial from '../../components/SpeedDial/SpeedDial';
import SimpleBottomNavigation from '../../components/SimpleBottomNavigation/SimpleBottomNavigation';

function Main() {
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

  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
     
      <Breadcrumb breadcrumbs={breadCrumbs} />

      <NewList
        initialFolderData={filteredData}
        selectedFoldersState={setSelectedItems}
        setSelectedFilesForOptions={setSelectedFilesForOptions}
        setSelectedFoldersForOptions={setSelectedFoldersForOptions}
        handleReload={handleReload}
      />


       </div>
  );
}

export default Main;
