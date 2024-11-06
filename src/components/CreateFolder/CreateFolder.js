import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import './CreateFolder.css';
import { useDispatch, useSelector } from 'react-redux';
import { handleStackClear } from '../HandleStack/HandleStack';
import { createFolder } from '../../Features/WorkSpace';
import { useParams } from 'react-router-dom';

function CreateFolder() {
    const dispatch = useDispatch();
    const [folderData, setFolderData] = useState({ name: '' });
    const folderStatus = useSelector(state => state.work.folderStatus);
    const directoryId = useSelector(state => state.path.currentDirectory);
    const reference_Id = localStorage.getItem('reference_Id');

    console.log('folderData',folderData,directoryId, reference_Id )

    const handleCreateFolder = () => {
        if (folderData.name && directoryId && reference_Id) {
            dispatch(createFolder({ reference_Id, directoryId, folderData }));
            setFolderData({ name: '' });
            handleStackClear(dispatch);
        }
    };

    useEffect(() => {
        if (folderStatus === 'succeeded') {
            // Add any post-success actions if needed
        }
    }, [folderStatus]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFolderData(prevData => ({ ...prevData, [name]: value }));
    };

    return (
        <div className="create-folder-overlay">
            <div className="create-folder-modal">
                <div className="create-folder-body">
                    <div className='button-container'>
                        <Button variant='contained' className='create-btn' onClick={handleCreateFolder}>Create</Button>
                        <Button variant='contained' onClick={() => handleStackClear(dispatch)} className='create-btn'>Cancel</Button>
                    </div>
                    <div className='create-input-container'>
                        <TextField
                            type='text'
                            name='name'
                            className='create-input'
                            placeholder='Folder Name'
                            value={folderData.name}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateFolder;
