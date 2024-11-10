import React, { useState, useCallback, useEffect } from 'react';
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
    const [isUploading, setIsUploading] = useState(false); 
    const [snackbarMessage,setSnackbarMessage] = useState('')
    const [totalSize, setTotalSize] = useState(0); 
    const dispatch = useDispatch();
    const reference_Id = localStorage.getItem('reference_Id');
    const { currentDirectory } = useSelector(state => state.path);

    const handleClose = useCallback(() => {
        handleStackClear(dispatch);
    }, [dispatch]);

    const handleSnackbarClose = useCallback(() => {
        setSnackbarMessage('');
        setSnackbarOpen(false);
    }, []);

    const calculateTotalSize = (files) => {
        return files.reduce((acc, file) => acc + file.size, 0);
    };

    const handleAddFile = useCallback(() => {
        const totalSize = calculateTotalSize(uploadedFiles);
        const maxTotalSize = 10 * 1024 * 1024; 

        const inputElement = document.createElement('input');
        inputElement.type = 'file';
        inputElement.multiple = true;
        inputElement.style.display = 'none';

        document.body.appendChild(inputElement);
        inputElement.click();

        inputElement.addEventListener('change', (event) => {
            const newFiles = Array.from(event.target.files);
            let newTotalSize = totalSize;
            let filecount = 0;

            // Filter files that are valid based on the total size
            const validFiles = newFiles.filter(file => {
                newTotalSize += file.size;
                filecount += 1;
                return newTotalSize <= maxTotalSize;
            });

            if (validFiles.length < newFiles.length) {
                setSnackbarOpen(true);
                setSnackbarMessage('File must be less than 10MB');
            }

            // Update uploaded files and total size
            setUploadedFiles(prevFiles => {
                const updatedFiles = [...prevFiles, ...validFiles];
                setTotalSize(calculateTotalSize(updatedFiles)); 
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
            setTotalSize(calculateTotalSize(updatedFiles)); 
            return updatedFiles;
        });
    }, []);

    const handleUpload = useCallback(() => {
        setIsUploading(true); 

        const formData = new FormData();
        uploadedFiles.forEach(file => {
            formData.append('files', file);
        });
      
        if (uploadedFiles.length > 0 && currentDirectory) {
            dispatch(uploadFile({ reference_Id, directoryId: currentDirectory, formData }))
                .then(() => {
                    setIsUploading(false); 
                    handleClose();
                })
                .catch(() => {
                    setIsUploading(false); 
                });
        } else {
            setIsUploading(false); 
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
                    {isUploading && <LinearProgress />}
                    <div className="file-list">
                        {uploadedFiles.map((file, index) => {
                            const fileSizeKB = (file.size / 1024).toFixed(2);
                            const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
                            
                            return (
                                <div key={index} className="file-details">
                                    <Box className="upload-name-input">
                                        {file.name}
                                    </Box>
                                    <p className='upload-size'>Size: {fileSizeKB > 1000 ? `${fileSizeMB} MB` : `${fileSizeKB} KB`}</p>
                                    <div>
                                       <DeleteOutlineOutlinedIcon className="delete-icon" onClick={() => handleRemoveFile(index)} />
                                    </div>
                                </div>
                            );
                        })} 
                    </div>
                    <p> Total selected size: {totalSize > 1000 ? `${(totalSize / (1024 * 1024)).toFixed(2)} MB` : `${(totalSize / 1024).toFixed(2)} KB`}</p>
                </div>

                <Snackbar 
                    open={snackbarOpen} 
                    autoHideDuration={3000} 
                    onClose={handleSnackbarClose} 
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert onClose={handleSnackbarClose} severity="warning" sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </div>
        )
    );
};

export default UploadFileDetails;
