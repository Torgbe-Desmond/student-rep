import React, { useEffect, useState } from 'react';
import { Button, LinearProgress, TextField, useMediaQuery } from '@mui/material';
import './CreateFolder.css';
import { useDispatch, useSelector } from 'react-redux';
import { handleStackClear } from '../HandleStack/HandleStack';
import { createFolder } from '../../Features/WorkSpace';

function CreateFolder() {
    const dispatch = useDispatch();
    const [folderData, setFolderData] = useState({ name: '' });
    const [isLoading, setIsLoading] = useState(false);
    const directoryId = useSelector(state => state.path.currentDirectory);
    const reference_Id = localStorage.getItem('reference_Id');  
    const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

    const handleCreateFolder = () => {
        if (folderData.name && directoryId && reference_Id) {
            setIsLoading(true);
            dispatch(createFolder({ reference_Id, directoryId, folderData }))
                .finally(() => {
                    setIsLoading(false);
                    handleStackClear(dispatch);
                });
        }
    };

    useEffect(() => {
        if (isLoading) {
            setFolderData({ name: '' })
        }
    }, [isLoading]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFolderData(prevData => ({ ...prevData, [name]: value }));
    };



    return (
        <div className="create-folder-overlay">
            <div className={`create-folder-modal ${isDarkMode ? 'switch' :'light'}`}>
                <div className="create-folder-body">
                    <div className="button-container">
                        <Button 
                        variant="contained" 
                        className="create-btn" 
                        onClick={handleCreateFolder}
                        disabled={isLoading}
                        >
                            {isLoading ? 'Creating..' : 'Create'}
                        </Button>
                        <Button 
                        variant="contained" 
                        onClick={() => handleStackClear(dispatch)} 
                        className="create-btn"
                        disabled={isLoading}
                        >
                            Cancel
                        </Button>
                    </div>
                    <div className="create-input-container">
                        {isLoading? (
                            <LinearProgress />
                        ) : (
                            <TextField
                              sx={{
                                  color: isDarkMode ? '#FFF' : '',
                                  '& .MuiInputBase-input': {
                                    color: isDarkMode ? '#FFF' : '',
                                    background: isDarkMode ? '' : '',
                                  },
                                  '& .MuiInputBase-input::placeholder': {
                                    color: isDarkMode ? '#FFF' : '',
                                  },
                                }}
                                type="text"
                                autoFocus
                                name="name"
                                className="create-input"
                                placeholder="Folder Name"
                                value={folderData.name}
                                onChange={handleChange}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateFolder;
