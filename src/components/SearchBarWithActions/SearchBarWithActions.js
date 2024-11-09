import React, { useState, useEffect, useCallback } from 'react';
import { TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';import './SearchBarWithActions.css';
import ButtonIcon from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedFolders } from '../../Features/WorkSpace';
import handleStack from '../HandleStack/HandleStack';

function SearchBarWithActions({ folderData, setFilteredData, selectedItems, selectedFilesForOptions, selectedFoldersForOptions }) {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const filteredFolderData = searchTerm
      ? folderData?.filter((folder) =>
          folder?.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : folderData;
    setFilteredData(filteredFolderData);
    dispatch(setSelectedFolders(selectedItems));
  }, [searchTerm, folderData, selectedItems, setFilteredData, dispatch]);

  const handleAction = useCallback(
    (actionType) => handleStack(actionType, dispatch),
    [dispatch]
  );

  // Button configuration with inline disabled conditions
  const buttonConfigs = [
    { iconType: <DeleteIcon />, color: 'primary', disabled: selectedItems?.length === 0, action: () => handleAction('Delete') },
    { iconType: <EditIcon />, color: 'primary', disabled: selectedFoldersForOptions?.length !== 1, action: () => handleAction('RenameFolder') },
    { iconType: <DriveFileMoveIcon />, color: 'primary', disabled: selectedItems?.length === 0, action: () => handleAction('Move') },
    { iconType: <FileDownloadIcon />, color: 'primary', disabled: selectedFilesForOptions?.length !== 1, action: () => handleAction('Download') },
    { iconType: <CreateNewFolderOutlinedIcon />, color: 'secondary', disabled: false, action: () => handleAction('CreateFolder') },
    { iconType: <UploadFileOutlinedIcon />, color: 'secondary', disabled: false, action: () => handleAction('UploadFileDetails') },
    // { iconType: <MoreVertIcon />, color: 'secondary', disabled: false, action: ()=> handleAction('ActionListCard') },
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
        {buttonConfigs?.map((config, index) => (
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
