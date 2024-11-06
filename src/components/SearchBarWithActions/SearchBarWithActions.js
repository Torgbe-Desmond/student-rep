import React, { useState, useEffect, useCallback } from 'react';
import { TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './SearchBarWithActions.css';
import ButtonIcon from '../Button/Button';
import { useParams } from 'react-router-dom';
import { deleteFile, deleteFolder, setSelectedFolders } from '../../Features/WorkSpace';
import { useDispatch, useSelector } from 'react-redux';
import { pushComponent } from '../../Features/StackSlice';
import handleStack, { stateForSelectedFolders } from '../HandleStack/HandleStack';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';


function SearchBarWithActions({ folderData, setFilteredData, selectedItems, selectedFilesForOptions, selectedFoldersForOptions }) {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const filteredFolderData = searchTerm
      ? folderData.filter((folder) =>
          folder.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : folderData;
    setFilteredData(filteredFolderData);
  }, [searchTerm, folderData, setFilteredData]);

  useEffect(()=>{
    dispatch(setSelectedFolders(selectedItems));
  },[selectedItems])


 const handleDelete = useCallback(() => handleStack('Delete', dispatch), [dispatch]);
 const handleMove = useCallback(() => handleStack('Move', dispatch), [dispatch]);
 const handleDownload = useCallback(() => handleStack('Download', dispatch), [dispatch]);
 const handleNotificationOverlay = useCallback(() => handleStack('NotifyOverlay', dispatch), [dispatch]);
 const handleRename = useCallback(() => handleStack('RenameFolder', dispatch), [dispatch]);
 const handleCreateFolder = useCallback(() => handleStack('CreateFolder', dispatch), [dispatch]);
 const handleUploadFileDetails = useCallback(() => handleStack('UploadFileDetails', dispatch), [dispatch]);
 
 // Instead of pushing the component itself, push a string key
// dispatch({
//   type: 'stack/pushComponent',
//   payload: { id: 'CreateFolder', componentName: 'CreateFolder' }
// });


  // Button state conditions
  const isValidToMove = selectedItems.length === 0;
  const isValidToDelete = selectedItems.length === 0;
  const isValidToEdit = selectedFoldersForOptions.length !== 1;
  const isValidToDownload = selectedFilesForOptions.length !== 1;

  const buttonConfigs = [
    { iconType: <DeleteIcon />, color: 'primary', disabled: isValidToDelete, action:handleDelete },
    { iconType: <EditIcon />, color: 'primary', disabled: isValidToEdit, action: handleRename },
    { iconType: <DriveFileMoveIcon />, color: 'primary', disabled: isValidToMove, action: handleMove },
    { iconType: <FileDownloadIcon />, color: 'primary', disabled: isValidToDownload, action: handleDownload },
    { iconType: <CreateNewFolderOutlinedIcon />, color: 'secondary', disabled: false, action: handleCreateFolder },
    { iconType: <UploadFileOutlinedIcon />, color: 'secondary', disabled: false, action: handleUploadFileDetails },
    { iconType: <MoreVertOutlinedIcon />, color: 'secondary', disabled: false, action: null },

  ];

  return (
    <div className="search-options">
      <TextField
        className="search-input"
        label="Search folders by name"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="button-group">
        {buttonConfigs.map((config, index) => (
          <ButtonIcon
            key={index}
            iconType={config.iconType}
            color={config.color}
            disabled={config.disabled}
            onClick={config.action}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchBarWithActions;
