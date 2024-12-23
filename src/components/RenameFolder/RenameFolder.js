import React, { useEffect, useState } from 'react';
import { Button, TextField, CircularProgress, LinearProgress } from '@mui/material';
import './RenameFolder.css';
import { useDispatch, useSelector } from 'react-redux';
import { handleStackClear } from '../HandleStack/HandleStack';
import { renameFolder } from '../../Features/WorkSpace';

function RenameFolder({ initialFolderName }) {
    const dispatch = useDispatch();
    const [folderName, setFolderName] = useState('');
    const [newFolderName, setNewFolderName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { folders, selectedFolders: selectedFolderList } = useSelector(state => state.work);
    const reference_Id = localStorage.getItem('reference_Id');

    useEffect(() => {
        if (folders.length > 0 && selectedFolderList.length > 0) {
            const folder = folders.find(item => selectedFolderList.includes(item._id));
            const initialName = folder ? folder.name : initialFolderName;
            setFolderName(initialName);
            setNewFolderName(initialName);
        }
    }, [folders, selectedFolderList, initialFolderName]);

    const handleRename = () => {
        if (selectedFolderList.length > 0 && newFolderName.trim() !== '') {
            setIsLoading(true);
            dispatch(renameFolder({ reference_Id, _id: selectedFolderList[0], name: newFolderName }))
                .finally(() => {
                    setIsLoading(false);
                    handleStackClear(dispatch);
                });
        }
    };

    return (
        <div className="rename-folder-overlay">
            <div className="rename-folder-modal">
                <div className="rename-folder-body">
                    <div className="button-container">
                        <Button
                            variant="contained"
                            className="rename-btn"
                            onClick={handleRename}
                            disabled={isLoading} // Disable button while loading
                        >
                             Rename                        
                    </Button>
                        <span className="folder-name">{folderName}</span>
                        <Button
                            variant="contained"
                            className="cancel-btn"
                            onClick={() => handleStackClear(dispatch)}
                        >
                            Cancel
                        </Button>
                    </div>
                    <div className="rename-input-container">
                   { isLoading ? 
                   <LinearProgress />
                       : <TextField
                            type="text"
                            className="rename-input"
                            placeholder="New Folder Name"
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                        />
                    }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RenameFolder;
