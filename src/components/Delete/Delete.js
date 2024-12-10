import React, { useState, useEffect, useCallback } from 'react';
import { Button, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, Avatar, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useDispatch, useSelector } from 'react-redux';
import { handleStackClear } from '../HandleStack/HandleStack';
import { clearSelectedIds, deleteFile, deleteFolder } from '../../Features/WorkSpace';
import axios from 'axios';
import './Delete.css';

function Delete() {
  const [randomName, setRandomName] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state for delete actions
  const dispatch = useDispatch();
  const [selectedFolders, setSelectedFolders] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const reduxCurrentDirectory = useSelector(state => state.path.currentDirectory);
  const [currentDirectory, setCurrentDirectory] = useState(null);
  const { folders, selectedFolders: selectedFolderList } = useSelector(state => state.work);
  const [files, setFiles] = useState(selectedFolderList);

  useEffect(() => {
    async function getRandomWord() {
      try {
        const response = await axios.get('https://random-word-api.herokuapp.com/word?length=5');
        if (response.data) {
          setRandomName(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching random word:', error);
      }
    }

    getRandomWord();
    setCurrentDirectory(reduxCurrentDirectory);

    return () => {
      setRandomName('');
    };
  }, [reduxCurrentDirectory]);

  const filteredSelectedDataByMimetypeForOnlyFilesOrFolders = () => {
    const onlyFileIds = folders
      ?.filter(
        (file) =>
          files.includes(file._id) &&
          file.mimetype !== 'Folder' &&
          file.mimetype !== 'Subscriptions' &&
          file.mimetype !== 'Shared'
      )
      .map((file) => file._id);

    const onlyFolderIds = folders
      ?.filter(
        (folder) =>
         files.includes(folder._id) &&
          (folder.mimetype === 'Folder' || folder.mimetype === 'Subscriptions' || folder.mimetype === 'Shared')
      )
      .map((folder) => folder._id);

    return {
      files: onlyFileIds,
      folders: onlyFolderIds,
    };
  };

  const handleRemoveFile = useCallback((index) => {
    setFiles(prevFiles => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1); // Remove file at the specified index
      return updatedFiles;
    });
  }, []);

  useEffect(() => {
    const { files, folders } = filteredSelectedDataByMimetypeForOnlyFilesOrFolders();
    setSelectedFiles(files);
    setSelectedFolders(folders);
  }, [folders, files]);

  const handleDelete = async () => {
    setIsLoading(true); // Start loading

    if (selectedFolders.length > 0 && currentDirectory) {
      dispatch(deleteFolder({ folderIds: selectedFolders, currentDirectory }))
      .finally(() => {
        setIsLoading(false);
        handleStackClear(dispatch);
        dispatch(clearSelectedIds());

    });
    }

    if (selectedFiles.length > 0 && currentDirectory) {
      dispatch(deleteFile({ directoryId: currentDirectory, fileIds: selectedFiles }))
      .finally(() => {
        setIsLoading(false);
        handleStackClear(dispatch);
        dispatch(clearSelectedIds());

    });
    }

  };

  const getFileNameById = (id) => {
    const fileOrFolder = folders.find(item => item._id === id);
    return fileOrFolder ? fileOrFolder.name : id;
  };

  return (
    <div className="delete-overlay">
      <div className="delete-modal">
        <div className="delete-button-container">
          <Button
            variant="contained"
            onClick={handleDelete}
            disabled={isLoading}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            onClick={() => handleStackClear(dispatch)}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
        <div className="selected-ids">
          <h4>{isLoading ? 'Deleting items...' : 'Items to be deleted:'}</h4>
          {isLoading ? (
            <LinearProgress />
          ) : (
            <List>
              {files.map((id, index) => (
                <ListItem
                 
                  key={id}
                  secondaryAction={
                    <IconButton 
                      edge="end" 
                      aria-label="delete"
                      onClick={() => handleRemoveFile(index)} // Pass index to remove the correct item
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <InsertDriveFileIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                  sx={{ 
                    maxWidth:'70%',
                    overflowX:'scroll'
                  }}
                  primary={getFileNameById(id)} 
                  />
                </ListItem>
              ))}
            </List>
          )}
        </div>
      </div>
    </div>
  );
}

export default Delete;
