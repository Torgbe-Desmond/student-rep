import React, { useState, useEffect, useCallback } from 'react';
import { Box, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import './SearchBarWithActions.css';
import ButtonIcon from '../Button/Button';
import { useDispatch } from 'react-redux';
import { setSelectedFolders } from '../../Features/WorkSpace';
import handleStack from '../HandleStack/HandleStack';
import { useParams } from 'react-router-dom';

function SearchBarWithActions({ folderData, setFilteredData, selectedItems, selectedFilesForOptions, selectedFoldersForOptions }) {
  const [searchTerm, setSearchTerm] = useState('');
  const { directoryId } = useParams();
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(true);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    setIsValid(!directoryId);
  }, [directoryId]);

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

  const logout = [
    { iconType: <LogoutIcon />, color: 'secondary', disabled: null, action: () => handleAction('Logout'), label: 'Logout' },
  ];

  const buttonConfigs = [
    { iconType: <DeleteIcon />, color: 'primary', disabled: selectedItems?.length === 0 || isValid, action: () => handleAction('Delete'), label: 'Delete' },
    { iconType: <EditIcon />, color: 'primary', disabled: selectedFoldersForOptions?.length !== 1 || isValid, action: () => handleAction('RenameFolder'), label: 'Rename' },
    { iconType: <DriveFileMoveIcon />, color: 'primary', disabled: selectedItems?.length === 0 || isValid, action: () => handleAction('Move'), label: 'Move' },
    { iconType: <FileDownloadIcon />, color: 'primary', disabled: selectedFilesForOptions?.length !== 1 || isValid, action: () => handleAction('Download'), label: 'Download' },
    { iconType: <FileUploadOutlinedIcon />, color: 'primary', disabled: selectedFilesForOptions?.length == 0 || isValid, action: () => handleAction('GenerateSecretCode'), label: 'Share Files' },
    { iconType: <FileDownloadOutlinedIcon />, color: 'primary', disabled: isValid, action: () => handleAction('ReceiveFiles'), label: 'Received Shared Files' },
    { iconType: <CreateNewFolderOutlinedIcon />, color: 'secondary', disabled: isValid, action: () => handleAction('CreateFolder'), label: 'Create Folder' },
    { iconType: <UploadFileOutlinedIcon />, color: 'secondary', disabled: isValid, action: () => handleAction('UploadFileDetails'), label: 'Upload File' },
  ];

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      const scrollPercentage = (scrollPosition / totalHeight) * 100;

      // Show the search bar when scroll percentage is greater than 20%
      if (scrollPercentage > 20) {
        setShowSearch(true);
      } else if(scrollPercentage < 1) {
        setShowSearch(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="search-options">
      {showSearch ? (
        <Box sx={{ position: "fixed", top: '5.6%', transform: "translateX(-50%)", transform: "translateY(-50%)", width: "90%", zIndex: 1000 }}>
          <TextField
            className="search-input fixed"
            sx={{
              boxShadow: '0 0 10px rgba(63, 81, 181, 0.5)'
            }}
            label="Search files by name"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
      ) : (
        <TextField
          className="search-input"
          label="Search files by name"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )}

      <div className="button-group">
        {buttonConfigs.map((config, index) => (
          <ButtonIcon
            key={index}
            iconType={config.iconType}
            color={config.color}
            disabled={config.disabled}
            onClick={config.action}
            ariaLabel={config.label}
          />
        ))}
      </div>
      <div className="logout">
        {logout.map((config, index) => (
          <ButtonIcon
            key={index}
            iconType={config.iconType}
            color={config.color}
            disabled={config.disabled}
            onClick={config.action}
            ariaLabel={config.label}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchBarWithActions;
