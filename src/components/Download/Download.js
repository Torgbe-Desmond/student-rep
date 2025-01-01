import React, { useEffect, useState } from 'react';
import { Button, TextField, useMediaQuery } from '@mui/material';
import './Download.css';
import { useDispatch, useSelector } from 'react-redux';
import { handleStackClear } from '../HandleStack/HandleStack';
import { downloadFile } from '../../Features/WorkSpace';

function Download() {
    const dispatch = useDispatch();
    const reference_Id = localStorage.getItem('reference_Id')
    const { selectedFolders: selectedFolderList,folders, error: workspaceError } = useSelector(state => state.work);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)')


    useEffect(() => {
        if (selectedFiles.length > 0 && reference_Id) {
            dispatch(downloadFile({ reference_Id, fileId: selectedFiles[0] }));
        }
    }, [dispatch, selectedFiles, reference_Id]);

 
    const filteredSelectedDataByMimetypeForOnlyFilesOrFolders = () => {
        const file = folders
            ?.filter((file) =>
                selectedFolderList.includes(file._id) &&
                file.mimetype !== 'Folder' &&
                file.mimetype !== 'Subscriptions' &&
                file.mimetype !== 'Shared'
            )
            .map((file) => file);

        return {
            file: file,
        };
    };

    useEffect(() => {
        const { file } = filteredSelectedDataByMimetypeForOnlyFilesOrFolders();
        setSelectedFiles(file);
    }, [folders]);



    const handleDownloadFile = () => {
        const link = document.createElement('a');
        link.href = selectedFiles[0].url;
        link.download = selectedFiles[0]?.name || 'downloaded_file';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    

    return (
        <div className="download-folder-overlay">
            <div className={`download-folder-modal ${isDarkMode ? 'switch' :'light'}`}>
            <div className="download-folder-body">
                    <div className='button-container'>
                        <Button variant='contained' className='download-btn' onClick={() => handleDownloadFile()}>Download</Button>
                        <Button variant='contained' className='download-btn' onClick={() => handleStackClear(dispatch)}>Cancel</Button>
                    </div>
                    <div className='download-input-container'>
                        <TextField
                            disabled
                            type='text'
                            className='download-input'
                            placeholder='File Name'
                            value={selectedFiles[0]?.name || ''}
                        />
                    </div>
                    <div className='download-input-container'>
                        <TextField
                            disabled
                            type='text'
                            className='download-input'
                            placeholder='Size'
                            value={selectedFiles[0]?.size || ''}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Download;
