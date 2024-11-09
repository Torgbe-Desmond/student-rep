import React, { useState, useEffect } from 'react';
import { Button, TextField, CircularProgress, LinearProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { handleStackClear } from '../HandleStack/HandleStack';
import './Delete.css';
import { clearFilesAndFolders, clearSelectedIds, deleteFile, deleteFolder } from '../../Features/WorkSpace';
import axios from 'axios';

function Delete() {
    const [randomName, setRandomName] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Loading state for delete actions
    const dispatch = useDispatch();
    const [selectedFolders, setSelectedFolders] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const reduxCurrentDirectory = useSelector(state => state.path.currentDirectory);
    const [currentDirectory, setCurrentDirectory] = useState(null);    
    const [_folders, setFolders] = useState();
    const { folders, error: workspaceError } = useSelector(state => state.work);
    const { selectedFolders: selectedFolderList } = useSelector(state => state.work);

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
    }, []);

    const filteredSelectedDataByMimetypeForOnlyFilesOrFolders = () => {
        const onlyFileIds = folders
            ?.filter((file) =>
                selectedFolderList.includes(file._id) &&
                file.mimetype !== 'Folder' &&
                file.mimetype !== 'Subscriptions'
            )
            .map((file) => file._id);

        const onlyFolderIds = folders
            ?.filter((folder) =>
                selectedFolderList.includes(folder._id) &&
                (folder.mimetype === 'Folder' || folder.mimetype === 'Subscriptions')
            )
            .map((folder) => folder._id);

        return {
            files: onlyFileIds,
            folders: onlyFolderIds,
        };
    };

    useEffect(() => {
        const { files, folders } = filteredSelectedDataByMimetypeForOnlyFilesOrFolders();
        setSelectedFiles(files);
        setSelectedFolders(folders);
    }, [folders]);

    const handleDelete = async () => {
        setIsLoading(true); // Start loading

        if (selectedFolders.length > 0 && currentDirectory) {
            await dispatch(deleteFolder({ folderIds: selectedFolders, currentDirectory }));
        }

        if (selectedFiles.length > 0 && currentDirectory) {
            await dispatch(deleteFile({ directoryId: currentDirectory, fileIds: selectedFiles }));
        }

        setIsLoading(false); // End loading
        handleStackClear(dispatch);
        dispatch(clearSelectedIds())
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
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
                        color="warning"
                        onClick={handleDelete}
                        className="move-btn"
                        disabled={isLoading}
                    >
                        Delete
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => handleStackClear(dispatch)}
                        className="move-btn"
                        disabled={isLoading} 
                    >
                        Cancel
                    </Button>
                </div>
                <div className="selected-ids">
                    <h4>{isLoading? 'Deleting items':'Items to be deleted:'}</h4>
                    { isLoading ? <LinearProgress />
                    : <ul>
                        {selectedFolderList.map((id) => (
                            <li key={id}>{getFileNameById(id)}</li>
                        ))}
                    </ul>}
                </div>
            </div>
        </div>
    );
}

export default Delete;
