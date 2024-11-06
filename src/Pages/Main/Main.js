import React, { useEffect, useState } from 'react';
import './Main.css';
import SearchBarWithActions from '../../components/SearchBarWithActions/SearchBarWithActions';
import NewList from '../../components/NewList/NewList';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearFilesAndFolders, getAdirectory, getAllFolders, getMainDirectories } from '../../Features/WorkSpace';
import Breadcrumb from '../../components/BreadCrumb/BreadCrumb';
import { setCurrentDirectory } from '../../Features/PathSlice';


function Main() {
  const [selectedItems,setSelectedItems] = useState([]);
  const {reference_Id , directoryId} = useParams();
  const dispatch = useDispatch();
  const { folders } = useSelector(state=>state.work);
  const [_folders,setFolders] = useState()
  const [filteredData, setFilteredData] = useState(null);
  const [selectedFilesForOptions, setSelectedFilesForOptions] = useState([]);
  const [selectedFoldersForOptions, setSelectedFoldersForOptions] = useState([]);
  const { breadCrumbs } = useSelector(state=>state.path);

  
  useEffect(()=>{

    if(reference_Id && directoryId){
        dispatch(getAdirectory({reference_Id , directoryId}))
        dispatch(setCurrentDirectory(directoryId))
    }

    if(reference_Id && !directoryId){
      dispatch(getMainDirectories({reference_Id}))
      dispatch(getAllFolders({reference_Id}))
    }

    return ()=>{
        console.log('something going on here')
        dispatch(clearFilesAndFolders())
    }
  },[reference_Id,directoryId,dispatch])


  useEffect(()=>{
    setFolders(folders)
    setFilteredData(folders)
  },[folders])

  return (
    <div className="app-container">

      <SearchBarWithActions 
      folderData={_folders} 
      setFilteredData={setFilteredData} 
      selectedItems={selectedItems} 
      selectedFilesForOptions={selectedFilesForOptions}
      selectedFoldersForOptions={selectedFoldersForOptions}
      />

      <Breadcrumb 
      breadcrumbs={breadCrumbs}
      />

      <NewList 
      initialFolderData={filteredData} 
      selectedFoldersState={setSelectedItems}
      setSelectedFilesForOptions={setSelectedFilesForOptions}
      setSelectedFoldersForOptions={setSelectedFoldersForOptions}
       />
    </div>
  );
}

export default Main;
