import React, { useEffect, useState } from 'react';
import { Button, LinearProgress, TextField, Snackbar, Alert } from '@mui/material';
import './ReceiveFiles.css';
import { useDispatch, useSelector } from 'react-redux';
import { handleStackClear } from '../HandleStack/HandleStack';
import { receiveFile } from '../../Features/WorkSpace';

function ReceiveFiles() {
    const dispatch = useDispatch();
    const [fileData, setFileData] = useState({ secreteCode: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);  // Snackbar state
    const currentDirectory = useSelector(state => state.path.currentDirectory);
    const reference_Id = localStorage.getItem('reference_Id');  

    const handleReceiveFile = () => {
        if (fileData.secreteCode && currentDirectory && reference_Id) {
            setIsLoading(true);
            dispatch(receiveFile({reference_Id, secreteCode : fileData.secreteCode }))
                .then(() => {
                    setOpenSnackbar(true);  // Show success Snackbar
                })
                .finally(() => {
                    setIsLoading(false);
                    handleStackClear(dispatch);
                });
        }
    };

    useEffect(() => {
        if (isLoading) {
            setFileData({ secreteCode: '' });
        }
    }, [isLoading]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFileData(prevData => ({ ...prevData, [name]: value }));
    };

    // Close Snackbar function
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div className="receive-files-overlay">
            <div className="receive-files-modal">
                <div className="receive-files-body">
                    <div className="button-container">
                        <Button 
                            variant="contained" 
                            className="receive-btn" 
                            onClick={handleReceiveFile}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Receiving..' : 'Receive'}
                        </Button>
                        <Button 
                            variant="contained" 
                            onClick={() => handleStackClear(dispatch)} 
                            className="receive-btn"
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                    </div>
                    <div className="receive-input-container">
                        {isLoading ? (
                            <LinearProgress />
                        ) : (
                            <TextField
                                type="text"
                                name="secreteCode"
                                className="receive-input"
                                placeholder="Enter Secret code to receive files."
                                value={fileData.secreteCode}
                                onChange={handleChange}
                            />
                        )}
                    </div>
                </div>
            </div>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Secret is added to SharedFiles!
                </Alert>
            </Snackbar>
        </div>
    );
}

export default ReceiveFiles;
