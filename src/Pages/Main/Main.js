import React from "react";
import "./Main.css";
import NewList from "../../components/NewList/NewList";
import { useOutletContext } from "react-router-dom";
import Breadcrumb from "../../components/BreadCrumb/BreadCrumb";

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
    setSearchTerm,
  } = useOutletContext();

  return (
    <div className={`app-container ${isDarkMode ? "dark-mode" : ""}`}>
      <Breadcrumb setSearchTerm={setSearchTerm} isDarkMode={isDarkMode} breadcrumbs={breadCrumbs} />

      <NewList
        isDarkMode={isDarkMode}
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
