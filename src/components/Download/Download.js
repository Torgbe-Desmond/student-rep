import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import './Download.css';
import { useDispatch, useSelector } from 'react-redux';
import { handleStackClear } from '../HandleStack/HandleStack';
import { downloadFile } from '../../Features/WorkSpace';

function Download({ initialFolderName }) {
    const dispatch = useDispatch();
    const [folderName, setFolderName] = useState(initialFolderName);
    const {downloadData } = useSelector(state => state.work);

    // useEffect(() => {
    //     if (fileIds.length > 0 && reference_Id) {
    //         dispatch(downloadFile({ reference_Id, fileId: fileIds[0] }));
    //     }
    // }, [dispatch, fileIds, reference_Id]);

    const handleDownloadFile = (url) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = downloadData?.originalname || 'downloaded_file';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="download-folder-overlay">
            <div className="download-folder-modal">
                <div className="download-folder-body">
                    <div className='button-container'>
                        <Button variant='contained' className='download-btn' onClick={() => handleDownloadFile(downloadData.url)}>Download</Button>
                        <Button variant='contained' className='download-btn' onClick={() => handleStackClear(dispatch)}>Cancel</Button>
                    </div>
                    <div className='download-input-container'>
                        <TextField
                            disabled
                            type='text'
                            className='download-input'
                            placeholder='File Name'
                            value={downloadData?.originalname || ''}
                            onChange={(e) => setFolderName(e.target.value)}
                        />
                    </div>
                    <div className='download-input-container'>
                        <TextField
                            disabled
                            type='text'
                            className='download-input'
                            placeholder='Size'
                            value={downloadData?.size || ''}
                            onChange={(e) => setFolderName(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Download;
