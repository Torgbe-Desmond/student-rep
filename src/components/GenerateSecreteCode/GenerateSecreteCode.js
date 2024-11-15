import React, { useEffect, useState } from 'react';
import { Button, LinearProgress, TextField } from '@mui/material';
import './GenerateSecretCode.css';
import { useDispatch, useSelector } from 'react-redux';
import { handleStackClear } from '../HandleStack/HandleStack';
import { generateSecretCode } from '../../Features/WorkSpace';

function GenerateSecretCode() {
    const dispatch = useDispatch();
    const secreteCode = useSelector(state => state.work.secreteCode);
    const [isLoading, setIsLoading] = useState(false);
    const directoryId = useSelector(state => state.path.currentDirectory);
    const reference_Id = localStorage.getItem('reference_Id'); 
    const [selectedFiles, setSelectedFiles] = useState([]);
    const { selectedFolders: selectedFolderList,folders, error: workspaceError } = useSelector(state => state.work);

    console.log('selectedFiles',selectedFiles)
 
    const filteredSelectedDataByMimetypeForOnlyFilesOrFolders = () => {
        const onlyFileIds = folders
            ?.filter((file) =>
                selectedFolderList.includes(file._id) &&
                file.mimetype !== 'Folder' &&
                file.mimetype !== 'Subscriptions'
            )
            .map((file) => file._id);

        return {
            files: onlyFileIds,
        };
    };

    useEffect(() => {
        const { files } = filteredSelectedDataByMimetypeForOnlyFilesOrFolders();
        setSelectedFiles(files);
    }, [folders]);


    const handleGenerateSecretCode = () => {
        if (reference_Id &&  selectedFiles.length > 0) {
            setIsLoading(true);
            dispatch(generateSecretCode({ reference_Id, fileIds:selectedFiles }))
                .finally(() => {
                    setIsLoading(false);
                    handleStackClear(dispatch);
                });
        }
    };

    const getFileNameById = (id) => {
        const fileOrFolder = folders.find(item => item._id === id);
        return fileOrFolder ? fileOrFolder.name : id;
    };


    return (
        <div className="generate-secret-code-overlay">
            <div className="generate-secret-code-modal">
                    <div className="button-container">
                        <Button 
                        variant="contained" 
                        className="generate-btn" 
                        onClick={handleGenerateSecretCode}
                        disabled={isLoading}
                        >
                            {isLoading ? 'Generating..' : 'Generate'}
                        </Button>
                        <Button 
                        variant="contained" 
                        onClick={() => handleStackClear(dispatch)} 
                        className="generate-btn"
                        disabled={isLoading}
                        >
                            Cancel
                        </Button>
                    </div>
                       <div className="generate-secrete-selected-ids">
                        <h4>{isLoading? 'Generating Secrete Code':'Files to be shared:'}</h4>
                        { isLoading ? <LinearProgress />
                        : <ul>
                            {selectedFolderList.map((id) => (
                                <li key={id}>{getFileNameById(id)}</li>
                            ))}
                        </ul>}
                       </div>
            </div>
        </div>
    );
}

export default GenerateSecretCode;
