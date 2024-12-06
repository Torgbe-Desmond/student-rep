import React, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { useDispatch, useSelector } from 'react-redux';
import handleStack from '../HandleStack/HandleStack';
import { useParams } from 'react-router-dom';
import './SpeedDial.css'


export default function BasicSpeedDial({
    selectedItems,
    selectedFilesForOptions,
    selectedFoldersForOptions
}) {
    const dispatch = useDispatch();
    const [isValid, setIsValid] = useState(true);
    const { directoryId } = useParams();

    const handleAction = useCallback(
        (actionType) => handleStack(actionType, dispatch),
        [dispatch]
      );

      useEffect(() => {
        setIsValid(!directoryId);
      }, [directoryId]);

      const buttonConfigs = [
        { iconType: <DeleteIcon />, color: 'primary', disabled: selectedItems?.length === 0 || isValid , action: () => handleAction('Delete'), label: 'Delete' },
        { iconType: <EditIcon />, color: 'primary', disabled: selectedFoldersForOptions?.length !== 1 || isValid, action: () => handleAction('RenameFolder'), label: 'Rename' },
        { iconType: <DriveFileMoveIcon />, color: 'primary', disabled: selectedItems?.length === 0 || isValid, action: () => handleAction('Move'), label: 'Move' },
        { iconType: <FileDownloadIcon />, color: 'primary', disabled: selectedFilesForOptions?.length !== 1 || isValid, action: () => handleAction('Download'), label: 'Download' },
        { iconType: <FileUploadOutlinedIcon />, color: 'primary', disabled: selectedFilesForOptions?.length == 0 || isValid, action: () => handleAction('GenerateSecretCode'), label: 'Share Files' },
        { iconType: <FileDownloadOutlinedIcon />, color: 'primary', disabled: true, action: () => handleAction('ReceiveFiles'), label: 'Received Shared Files' },
        { iconType: <CreateNewFolderOutlinedIcon />, color: 'secondary', disabled: isValid, action: () => handleAction('CreateFolder'), label: 'Create Folder' },
        { iconType: <UploadFileOutlinedIcon />, color: 'secondary', disabled: isValid, action: () => handleAction('UploadFileDetails'), label: 'Upload File' },
      ];
    

  return (
  <div className='basic-speed-dial'>
      <Box sx={{ 
        height: 320, 
        transform: 'translateZ(0px)', 
        flexGrow: 1, 
        zIndex:1,
        position:'fixed',
        right:10,
        bottom:10
        }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {buttonConfigs.map((action) => (
          <SpeedDialAction
            key={action.label}
            icon={action.iconType}
            tooltipTitle={action.label}
            onClick={action.action}
            disabled={action.disabled}
          />
        ))}
      </SpeedDial>
    </Box>
  </div>
  );
}