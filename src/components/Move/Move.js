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
    const { moveItemsArray,files, moveItemStatus } = useSelector(state => state.work);
    const selectedIs = useSelector(state => state.extra.selectedIs);
    const currentDirectory = useSelector(state=>state.path.currentDirectory)
    const reference_Id = localStorage.getItem('reference_Id');
    const {directoryId} = useParams();

    useEffect(() => {
        dispatch(getAllFolders({ reference_Id }));
    }, [dispatch, reference_Id]);

    const findItemById = (id, itemsArray) => itemsArray.find(item => item._id === id);

    const isValidFile = item => item && item.mimetype !== 'Folder' && item.mimetype !== 'Subscription';

    const isFolderOrSubscription = item => item && (item.mimetype === 'Folder' || item.mimetype === 'Subscription');

    const fileIds = selectedIs.filter(itemId => {
        const item = findItemById(itemId, files);
        return isValidFile(item);
    });

    const folderIds = selectedIs.filter(itemId => {
        const item = findItemById(itemId, moveItemsArray);
        return isFolderOrSubscription(item);
    });


    const handleMove = (e) => {
        const { value } = e.target;
        setName(value);
    };

    const handleSearch = (e) => {
        const { value } = e.target;
        setSearch(value);
    };

    const handleMoveFiles = (folderId) => {
        if (fileIds.length > 0) {
            dispatch(moveFile({ reference_Id,DirectoriesToMoveFileTo:[folderId],FileIds:fileIds, DirectoryFileIsMoveFrom:currentDirectory }));
        }
    };

    const handleMoveFolders = (folderId) => {
        if (folderIds.length > 0) {
            dispatch(moveFolder({ reference_Id, directoriesToMove: folderIds, directoryToMoveTo: [folderId] }));
        }
    };

    const handleMoveAction = () => {
        if (match.length !== 1) {
            console.log('Please specify exactly one folder to move the items to.');
            return;
        }

        const folderId = match[0]._id;
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
        ? moveItemsArray.filter(file => file.label.toLowerCase().includes(search.toLowerCase()))
        : moveItemsArray;

    const match = name
        ? moveItemsArray.filter(file => file.label.toLowerCase() === name.toLowerCase())
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
