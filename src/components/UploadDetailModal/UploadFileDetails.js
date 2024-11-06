import React, { useState, useCallback } from 'react';
import './UploadFileDetails.css';
import { Button, TextField } from '@mui/material';
import { handleStackClear } from '../HandleStack/HandleStack';
import { useDispatch, useSelector } from 'react-redux';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { uploadFile } from '../../Features/WorkSpace';

const UploadFileDetails = () => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch();
    const reference_Id = localStorage.getItem('reference_Id');
    const { currentDirectory } = useSelector(state => state.path);

    const handleClose = useCallback(() => {
        handleStackClear(dispatch);
    }, [dispatch]);

    const handleAddFile = useCallback(() => {
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
                    if (!updatedFiles.some(f => f.name === file.name)) {
                        updatedFiles.push(file);
                    }
                });
                return updatedFiles;
            });

            document.body.removeChild(inputElement);
        });
    }, []);

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
        const formData = new FormData();
        
        uploadedFiles.forEach(file => {
          formData.append('files', file);
        });
      
        console.log('FormData entries:', formData.entries());
      
        if (uploadedFiles.length > 0) {
          dispatch(uploadFile({ reference_Id, directoryId: currentDirectory, formData }));
        }
        handleClose();
      }, [dispatch, reference_Id, currentDirectory, uploadedFiles, handleClose]);

    return (
        open && (
            <div className="upload-file-details-overlay">
                <div className="upload-file-details-content">
                    <div className="button-container">
                        <Button variant='contained' className="btn add-file-btn" onClick={handleAddFile}>Add File</Button>
                        <Button variant='contained' className="btn close-btn" onClick={handleClose}>Close</Button>
                        {uploadedFiles.length > 0 && (
                            <Button variant='contained' className="btn change-name-btn" onClick={handleUpload}>Upload</Button>
                        )}
                    </div>
                    <div className='file-list'>
                        {uploadedFiles.map((file, index) => (
                            <div key={index} className="file-details">
                                <TextField
                                    disabled
                                    type="text"
                                    value={file.name}
                                    onChange={(event) => handleChangeName(index, event)}
                                    className="upload-name-input"
                                    placeholder='Enter new file name'
                                />
                                <p>Size: {file.size} KB</p>
                                <DeleteOutlineOutlinedIcon className="delete-icon" onClick={() => handleRemoveFile(index)} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    );
};

export default UploadFileDetails;
