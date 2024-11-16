import { Button, CircularProgress, TextField } from '@mui/material';
import './Move.css';
import { handleStackClear } from '../HandleStack/HandleStack';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { clearMoveItemsArray, getAllFolders, moveFile, moveFolder } from '../../Features/WorkSpace';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import { clearSelectedIds } from '../../Features/Extra';
import { useParams } from 'react-router-dom';

function Move() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [name, setName] = useState('');
    const { moveItemsArray,folders, moveItemStatus,selectedFolders:selectedFolderList } = useSelector(state => state.work);
    const currentDirectory = useSelector(state=>state.path.currentDirectory)
    const reference_Id = localStorage.getItem('reference_Id');
    const [selectedFolders, setSelectedFolders] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedMoveFiles, setSelectedMoveFiles] = useState([]);
    const {directoryId} = useParams();

    useEffect(() => {
        dispatch(getAllFolders({ reference_Id }));
    }, [dispatch, reference_Id]);

    const handleMove = (e) => {
        const { value } = e.target;
        setName(value);
    };

    const handleSearch = (e) => {
        const { value } = e.target;
        setSearch(value);
    };


    const filtereOutSelectedItemsToMove = ()=>{
        const foldersToMoveSelectedItemsTo = moveItemsArray?.filter(
            (folder) => !selectedFolderList.includes(folder.path)
        );
        setSelectedMoveFiles(foldersToMoveSelectedItemsTo)
    }

    useEffect(()=>{ 
        filtereOutSelectedItemsToMove()
    },[selectedFolderList])


    const handleMoveFiles = (folderId) => {
        if (selectedFiles.length > 0) {
            dispatch(moveFile(
                { 
                    reference_Id,
                    DirectoriesToMoveFileTo:[folderId],
                    FileIds:selectedFiles, 
                    DirectoryFileIsMoveFrom:currentDirectory 
                }
            ));
        }
    };

    const handleMoveFolders = (folderId) => {
        if (selectedFolders.length > 0) {
            dispatch(moveFolder(
                { 
                    reference_Id, 
                    directoriesToMove: selectedFolders, 
                    directoryToMoveTo: [folderId] 
                }));
        }
    };
        
    const filteredSelectedDataByMimetypeForOnlyFilesOrFolders = () => {
        const onlyFiles = folders?.filter(
          (folder) => selectedFolderList.includes(folder._id) && 
          folder.mimetype !== 'Folder' && 
          folder.mimetype !== 'Subscriptions' &&
          folder.mimetype !== 'Shared'
        );
        const onlyFolders = folders?.filter(
          (folder) => selectedFolderList.includes(folder._id) && (
            folder.mimetype === 'Folder' || 
            folder.mimetype === 'Subscriptions' || 
            folder.mimetype === 'Shared')
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

    const handleMoveAction = () => {
        if (match.length !== 1) {
            console.log('Please specify exactly one folder to move the items to.');
            return;
        }

        const folderId = match[0].path;
        console.log('where to move', folderId);

        if (!folderId) {
            console.log('Invalid folder ID');
            return;
        }

        handleMoveFiles(folderId);
        handleMoveFolders(folderId);
        handleStackClear(dispatch);
    };

    const filteredFolders = search
        ? selectedMoveFiles.filter(file => file.label.toLowerCase().includes(search.toLowerCase()))
        : selectedMoveFiles;

    const match = name
        ? selectedMoveFiles.filter(file => file.label.toLowerCase() === name.toLowerCase())
        : [];

    return (
        <div className="move-overlay">
            <div className='move-modal'>
                <div className='top-move-modal'>
                    <div className='input-top'>
                        <TextField
                            type='text'
                            className='move-search-input'
                            placeholder='Search folders'
                            value={search}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className={moveItemStatus === 'loading' ? 'loading' : 'available-folders'}>
                        {moveItemStatus === 'loading' ? (
                            <div className='loading-container'>
                                <CircularProgress />
                            </div>
                        ) : (
                            filteredFolders.length > 0 ? (
                                filteredFolders.map(folder => (
                                    <span className='f-item' key={folder._id}>
                                        <FolderOpenOutlinedIcon sx={{ paddingRight: '5px' }} />   {folder.label}
                                    </span>
                                ))
                            ) : (
                                <p>No available folders</p>
                            )
                        )}
                    </div>
                </div>
                <div className='input-vv'>
                    <TextField
                        type='text'
                        className='move-search'
                        placeholder='Type folder name to move'
                        value={name}
                        onChange={handleMove}
                    />
                </div>
                <div className='bottom-move-modal'>
                    <div className='move-button-container'>
                        <Button
                            variant='contained'
                            disabled={match.length !== 1}
                            onClick={handleMoveAction}
                            className='move-btn'
                        >
                            Move
                        </Button>
                        <Button
                            variant='contained'
                            onClick={() => handleStackClear(dispatch)}
                            className='move-btn'
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Move;
