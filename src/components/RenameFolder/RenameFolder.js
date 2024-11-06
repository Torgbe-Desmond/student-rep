import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import './RenameFolder.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearStack } from '../../Features/StackSlice';
import { handleStackClear } from '../HandleStack/HandleStack';
import { renameFolder } from '../../Features/WorkSpace';
import { useParams } from 'react-router-dom';

function RenameFolder({ initialFolderName }) {
    const dispatch = useDispatch();
    const [folderName, setFolderName] = useState('');
    const [newFolderName, setNewFolderName] = useState('');
    const selectedIs = useSelector(state => state.extra.selectedIs);
    const { folders } = useSelector(state => state.work);
    const reference_Id = localStorage.getItem('reference_Id')

    useEffect(() => {
        if (folders.length > 0 && selectedIs.length > 0) {
            const folder = folders.find(item => selectedIs.includes(item._id));
            const initialName = folder ? folder.name : initialFolderName;
            setFolderName(initialName);
            setNewFolderName(initialName);
        }
    }, [folders, selectedIs, initialFolderName]);

    const handleRename = () => {
        if (selectedIs.length > 0 && newFolderName.trim() !== '') {
            dispatch(renameFolder({ reference_Id, _id: selectedIs[0], name: newFolderName }));
            handleStackClear(dispatch);
        }
    };

    return (
        <div className="rename-folder-overlay">
            <div className="rename-folder-modal">
                <div className="rename-folder-body">
                    <div className='button-container'>
                        <Button
                            variant='contained'
                            className='rename-btn'
                            onClick={handleRename}
                        >
                            Rename
                        </Button>
                        <span>{folderName}</span>
                        <Button
                            variant='contained'
                            className='rename-btn'
                            onClick={() => handleStackClear(dispatch)}
                        >
                            Cancel
                        </Button>
                    </div>
                    <div className='rename-input-container'>
                        <TextField
                            type='text'
                            className='rename-input'
                            placeholder='New Folder Name'
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RenameFolder;
