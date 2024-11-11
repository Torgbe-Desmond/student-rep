import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  CircularProgress,
  Typography,
  Button,
} from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './NewList.css';

const getFilteredData = (folderData, selectedFolders) => ({
  files: folderData?.filter(folder => selectedFolders.includes(folder._id) && folder.mimetype !== 'Folder' && folder.mimetype !== 'Subscriptions'),
  folders: folderData?.filter(folder => selectedFolders.includes(folder._id) && (folder.mimetype === 'Folder' || folder.mimetype === 'Subscriptions')),
});

function NewList({ initialFolderData, selectedFoldersState, setSelectedFilesForOptions, setSelectedFoldersForOptions, handleReload }) {
  const [folderData, setFolderData] = useState([]);
  const [selectedFolders, setSelectedFolders] = useState([]);
  const { reference_Id } = useParams();
  const { status, error } = useSelector(state => state.work);
  const navigate = useNavigate();

  useEffect(() => {
    setFolderData(initialFolderData);
  }, [initialFolderData]);

  const toggleFolderSelection = (id) => {
    setSelectedFolders(prev => prev.includes(id) ? prev.filter(folderId => folderId !== id) : [...prev, id]);
    selectedFoldersState(prev => prev.includes(id) ? prev.filter(folderId => folderId !== id) : [...prev, id]);
  };

  const handleSelectAll = (event) => {
    const allFolderIds = event.target.checked ? folderData?.map(folder => folder._id) : [];
    setSelectedFolders(allFolderIds);
    selectedFoldersState(allFolderIds);
  };

  useEffect(() => {
    const { files, folders } = getFilteredData(folderData, selectedFolders);
    setSelectedFoldersForOptions(folders);
    setSelectedFilesForOptions(files);

    return () => {
      setSelectedFoldersForOptions([]);
      setSelectedFilesForOptions([]);
    };
  }, [selectedFolders, folderData]);

  const handleDeleteSelected = () => {
    setFolderData(prev => prev.filter(folder => !selectedFolders.includes(folder._id)));
    setSelectedFolders([]);
  };

  const handleNavigate = (id, mimetype) => {
    if (mimetype === 'Folder' || mimetype === 'Subscriptions') {
      navigate(`/${reference_Id}/directories/${id}`);
    }
  };


  const handleFileSize = ({mimetype,size})=>{
    let totalSize
    const fileSizeKB = (size / 1024).toFixed(2);
    const fileSizeMB = (size / (1024 * 1024)).toFixed(2)
    if(mimetype === 'Folder' || mimetype === 'Subscriptions'){
        return size;
    } 

    if(size > 1024){
      totalSize = `${fileSizeMB} mb`;
    } else {
      totalSize = `${fileSizeKB} kb`;
    }

    return totalSize;
  }

  const renderIcon = (mimetype) => 
    mimetype === 'Folder' || mimetype === 'Subscriptions' ? <FolderOpenIcon /> : <InsertDriveFileOutlinedIcon />;

  return (
    <div className="newlist-container">
      <TableContainer component={Paper} sx={{ width: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selectedFolders?.length > 0 && selectedFolders?.length < folderData?.length}
                  checked={selectedFolders?.length === folderData?.length && folderData?.length > 0}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Folder</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Mime Type</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Last Modified</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {status === 'loading' && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}
            {status === 'failed' && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography color="error">{error || 'Failed to load folders'}</Typography>
                </TableCell>
              </TableRow>
            )}
            {status === 'succeeded' && folderData?.length > 0 ? (
              folderData?.map(folder => (
                <TableRow key={folder._id} selected={selectedFolders.includes(folder._id)}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedFolders?.includes(folder._id)}
                      onChange={() => toggleFolderSelection(folder._id)}
                    />
                  </TableCell>
                  <TableCell>{renderIcon(folder.mimetype)}</TableCell>
                  <TableCell onClick={() => handleNavigate(folder._id, folder.mimetype)} sx={{ cursor: 'pointer' }}>
                    {folder.name}
                  </TableCell>
                  <TableCell>{folder.mimetype}</TableCell>
                  <TableCell>{handleFileSize(folder)}</TableCell>
                  <TableCell>{new Date(folder.lastUpdated).toLocaleDateString()}</TableCell>
                </TableRow>
              ))
            ) : status === 'succeeded' && folderData?.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography>No folders available</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {status === 'failed' && (
       <div className='reload-btn-container'>
         <Button onClick={handleReload} sx={{ mt: 2 }} variant="outlined">
          Reload
        </Button>
      </div>
      )}
    </div>
  );
}

export default NewList;
