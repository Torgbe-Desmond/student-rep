import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { handleStackClear } from '../HandleStack/HandleStack';
import './Delete.css';
import { deleteFile, deleteFolder } from '../../Features/WorkSpace';
import axios from 'axios';

function Delete() {
    const [randomName, setRandomName] = useState('');
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const [selectedFolders, setSelectedFolders] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const reduxCurrentDirectory = useSelector(state => state.path.currentDirectory);
    const [currentDirectory, setCurrentDirectory] = useState(null);    
    const [_folders,setFolders] = useState();
    const { folders, error: workspaceError } = useSelector(state=>state.work);
    const {selectedFolders:selectedFolderList} = useSelector(state=>state.work);


    useEffect(() => {

        async function getRandomWord() {
            try {
                const response = await axios.get('https://random-word-api.herokuapp.com/word?length=5');
                if(response.data){
                    setRandomName(response.data[0]);
                }
            } catch (error) {
                console.error('Error fetching random word:', error);
                return null;
            }
        }

        getRandomWord();
        setCurrentDirectory(reduxCurrentDirectory)

        return()=>{
            setRandomName('')
        }
    }, []);

    
    const filteredSelectedDataByMimetypeForOnlyFilesOrFolders = () => {
        const onlyFiles = folders?.filter(
          (folder) => selectedFolderList.includes(folder._id) && folder.mimetype !== 'Folder' && folder.mimetype !== 'Subscriptions'
        );
        const onlyFolders = folders?.filter(
          (folder) => selectedFolderList.includes(folder._id) && (folder.mimetype === 'Folder' || folder.mimetype === 'Subscriptions')
        );
    
        return {
          files: onlyFiles,
          folders: onlyFolders,
        };
      };

      useEffect(()=>{
        const { files, folders } = filteredSelectedDataByMimetypeForOnlyFilesOrFolders();
        setSelectedFiles(files);
        setSelectedFolders(folders);
      },[folders])


    const handleDelete = () => {
  
        if(selectedFolders.length > 0 && currentDirectory){
            dispatch(deleteFolder({ folderIds:selectedFolders, currentDirectory }));
        }

        if(selectedFiles.length > 0 && currentDirectory){
            dispatch(deleteFile({directoryId:currentDirectory,fileIds:selectedFiles}))
        }

        handleStackClear(dispatch)
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const getFileNameById = (id) => {
        const fileOrFolder = folders.find(item => item._id === id);
        return fileOrFolder ? fileOrFolder.name : id;
    };

    return (
        <div className="delete-overlay">
            <div className='delete-modal'>
                <div className='delete-button-container'>
                    <Button
                        variant='contained'
                        color='warning'
                        disabled={!(name === randomName)}
                        onClick={handleDelete}
                        className='move-btn'
                    >
                        Delete
                    </Button>
                    <span>
                        <span className='folder-name'>{randomName}</span>
                    </span>
                    <Button
                        variant='contained'
                        onClick={() => handleStackClear(dispatch)}
                        className='move-btn'
                    >
                        Cancel
                    </Button>
                </div>
                <TextField
                    placeholder='Type the random word to delete'
                    value={name}
                    onChange={handleNameChange}
                    fullWidth
                    margin='normal'
                />
                <div className='selected-ids'>
                    <h4>Items to be deleted:</h4>
                    <ul>
                        {selectedFolderList.map((id) => (
                            <li key={id}>{getFileNameById(id)}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Delete;
