import React, { useState, useCallback } from 'react';
import './UploadFileDetails.css';
import { Button, TextField, Snackbar, Alert, LinearProgress, Box } from '@mui/material';
import { handleStackClear } from '../HandleStack/HandleStack';
import { useDispatch, useSelector } from 'react-redux';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { uploadFile } from '../../Features/WorkSpace';

const UploadFileDetails = () => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [open, setOpen] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false); 
    const [isUploading, setIsUploading] = useState(false); // Loading state for upload
    const dispatch = useDispatch();
    const reference_Id = localStorage.getItem('reference_Id');
    const { currentDirectory } = useSelector(state => state.path);

    const handleClose = useCallback(() => {
        handleStackClear(dispatch);
    }, [dispatch]);

    const handleSnackbarClose = useCallback(() => {
        setSnackbarOpen(false);
    }, []);

    const handleAddFile = useCallback(() => {
        if (uploadedFiles.length >= 2) {
            setSnackbarOpen(true);
            return;
        }

        const inputElement = document.createElement('input');
        inputElement.type = 'file';
        inputElement.multiple = true;
        inputElement.style.display = 'none';

        document.body.appendChild(inputElement);
        inputElement.click();

        inputElement.addEventListener('change', (event) => {
            const newFiles = Array.from(event.target.files);
            setUploadedFiles(prevFiles => {
                const updatedFiles = [...prevFiles];
                newFiles.forEach(file => {
                    if (updatedFiles.length < 3 && !updatedFiles.some(f => f.name === file.name)) {
                        updatedFiles.push(file);
                    }
                });
                return updatedFiles;
            });

            document.body.removeChild(inputElement);
        });
    }, [uploadedFiles]);

    const handleChangeName = useCallback((index, event) => {
        setUploadedFiles(prevFiles => {
            const newFiles = [...prevFiles];
            newFiles[index].name = event.target.value;
            return newFiles;
        });
    }, []);

    const handleRemoveFile = useCallback((index) => {
        setUploadedFiles(prevFiles => {
            const updatedFiles = [...prevFiles];
            updatedFiles.splice(index, 1);
            return updatedFiles;
        }); 
    }, []);

    const handleUpload = useCallback(() => {
        setIsUploading(true); // Start loading

        const formData = new FormData();
        uploadedFiles.forEach(file => {
            formData.append('files', file);
        });
      
        if (uploadedFiles.length > 0 && currentDirectory) {
            dispatch(uploadFile({ reference_Id, directoryId: currentDirectory, formData }))
                .then(() => {
                    setIsUploading(false); // Stop loading on success
                    handleClose();
                })
                .catch(() => {
                    setIsUploading(false); // Stop loading on error
                });
        } else {
            setIsUploading(false); // Stop loading if no files to upload
        }
    }, [dispatch, reference_Id, currentDirectory, uploadedFiles, handleClose]);

    return (
        open && (
            <div className="upload-file-details-overlay">
                <div className="upload-file-details-content">
                    <div className="button-container">
                        <Button variant="contained" className="btn add-file-btn" onClick={handleAddFile}>
                            Add File
                        </Button>
                        <Button variant="contained" className="btn close-btn" onClick={handleClose}>
                            Close
                        </Button>
                        {uploadedFiles.length > 0 && (
                            <Button variant="contained" className="btn change-name-btn" onClick={handleUpload} disabled={isUploading}>
                                {isUploading ? 'Uploading...' : 'Upload'}
                            </Button>
                        )}
                    </div>
                    {isUploading && <LinearProgress />} {/* Loading bar for upload */}
                    <div className="file-list">
                        {uploadedFiles.map((file, index) => (
                            <div key={index} className="file-details">
                
                                <Box
                                className="upload-name-input"
                                >
                                    {file.name}
                                </Box>
                                <p>Size: {file.size} KB</p>
                                <DeleteOutlineOutlinedIcon className="delete-icon" onClick={() => handleRemoveFile(index)} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Snackbar component for the file limit message */}
                <Snackbar 
                    open={snackbarOpen} 
                    autoHideDuration={3000} 
                    onClose={handleSnackbarClose} 
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert onClose={handleSnackbarClose} severity="warning" sx={{ width: '100%' }}>
                        You can add only 2 files at a time
                    </Alert>
                </Snackbar>
            </div>
        )
    );
};

export default UploadFileDetails;
