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
} from '@mui/material';
import './NewList.css';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function NewList({ initialFolderData, selectedFoldersState, setSelectedFilesForOptions, setSelectedFoldersForOptions }) {
  const [folderData, setFolderData] = useState([]);
  const [selectedFolders, setSelectedFolders] = useState([]);
  const { reference_Id } = useParams();
  const { status, error } = useSelector(state => state.work);
  const navigate = useNavigate();

  useEffect(() => {
    setFolderData(initialFolderData);
  }, [initialFolderData]);

  const handleSelectFolder = (id) => {
    setSelectedFolders((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((folderId) => folderId !== id)
        : [...prevSelected, id]
    );
    selectedFoldersState((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((folderId) => folderId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allFolderIds = folderData.map((folder) => folder._id);
      setSelectedFolders(allFolderIds);
      selectedFoldersState(allFolderIds);
    } else {
      setSelectedFolders([]);
      selectedFoldersState([]);
    }
  };

  const filteredSelectedDataByMimetypeForOnlyFilesOrFolders = () => {
    const onlyFiles = folderData?.filter(
      (folder) => selectedFolders.includes(folder._id) && folder.mimetype !== 'Folder' && folder.mimetype !== 'Subscriptions'
    );
    const onlyFolders = folderData?.filter(
      (folder) => selectedFolders.includes(folder._id) && (folder.mimetype === 'Folder' || folder.mimetype === 'Subscriptions')
    );

    return {
      files: onlyFiles,
      folders: onlyFolders,
    };
  };

  useEffect(() => {
    const { files, folders } = filteredSelectedDataByMimetypeForOnlyFilesOrFolders();
    setSelectedFoldersForOptions(folders?.length > 0 ? folders : []);
    setSelectedFilesForOptions(files?.length > 0 ? files : []);

    return () => {
      setSelectedFoldersForOptions([]);
      setSelectedFilesForOptions([]);
    };
  }, [selectedFolders, folderData]);

  const handleDeleteSelected = () => {
    setFolderData((prevData) => prevData?.filter((folder) => !selectedFolders.includes(folder._id)));
    setSelectedFolders([]);
  };

  const handleNavigate = (id, mimetype) => {
    if (id && (mimetype === 'Folder' || mimetype === 'Subscriptions')) {
      navigate(`/${reference_Id}/directories/${id}`);
    }
  };

  const renderAccordingToMimetype = (mimetype) => {
    return mimetype === 'Folder' || mimetype === 'Subscriptions' ? (
      <FolderOpenIcon />
    ) : (
      <InsertDriveFileOutlinedIcon />
    );
  };

  return (
    <div className="newlist-container">
      <TableContainer sx={{ width: '100vw' }} component={Paper}>
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
              folderData.map((folder) => (
                <TableRow key={folder._id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedFolders.includes(folder._id)}
                      onChange={() => handleSelectFolder(folder._id)}
                    />
                  </TableCell>
                  <TableCell>{renderAccordingToMimetype(folder.mimetype)}</TableCell>
                  <TableCell
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleNavigate(folder._id, folder.mimetype)}
                  >
                    {folder.name}
                  </TableCell>
                  <TableCell>{folder.mimetype}</TableCell>
                  <TableCell>{folder.size}</TableCell>
                  <TableCell>{new Date(folder.lastUpdated).toLocaleDateString()}</TableCell>
                </TableRow>
              ))
            ) : status === 'succeeded' && folderData?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography>No folders available</Typography>
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default NewList;
