import { Button, CircularProgress, TextField, Snackbar, Alert, LinearProgress } from '@mui/material';
import './Move.css';
import { handleStackClear } from '../HandleStack/HandleStack';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { clearMoveItemsArray, getAllFolders, moveFile, moveFolder } from '../../Features/WorkSpace';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import { useParams } from 'react-router-dom';

function Move() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [name, setName] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const { moveItemsArray, folders, moveItemStatus, selectedFolders: selectedFolderList } = useSelector(state => state.work);
    const currentDirectory = useSelector(state => state.path.currentDirectory);
    const reference_Id = localStorage.getItem('reference_Id');
    const [selectedFolders, setSelectedFolders] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedMoveFiles, setSelectedMoveFiles] = useState([]);

    useEffect(() => {
        dispatch(getAllFolders({ reference_Id }));
    }, [dispatch, reference_Id]);

    const handleMove = (e) => {
        setName(e.target.value);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const filtereOutSelectedItemsToMove = () => {
        const foldersToMoveSelectedItemsTo = moveItemsArray?.filter(
            (folder) => !selectedFolderList.includes(folder.path)
        );
        setSelectedMoveFiles(foldersToMoveSelectedItemsTo);
    };

    useEffect(() => { 
        filtereOutSelectedItemsToMove();
    }, [selectedFolderList]);

    const handleMoveFiles = (folderId) => {
        if (selectedFiles.length > 0) {
            setIsLoading(true);
            dispatch(moveFile({
                reference_Id,
                DirectoriesToMoveFileTo: [folderId],
                FileIds: selectedFiles,
                DirectoryFileIsMoveFrom: currentDirectory
            })).finally(() => setIsLoading(false));
        }
    };

    const handleMoveFolders = (folderId) => {
        if (selectedFolders.length > 0) {
            setIsLoading(true);
            dispatch(moveFolder({
                reference_Id,
                directoriesToMove: selectedFolders,
                directoryToMoveTo: [folderId]
            }))
            .finally(() => {
                setIsLoading(false);
                handleStackClear(dispatch);
            });
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

    useEffect(() => {
        const { files, folders } = filteredSelectedDataByMimetypeForOnlyFilesOrFolders();
        setSelectedFiles(files);
        setSelectedFolders(folders);
    }, [folders]);

    const handleMoveAction = () => {
        if (match.length !== 1) {
            setSnackbar({ open: true, message: 'Please specify exactly one folder to move the items to.', severity: 'error' });
            return;
        }

        const folderId = match[0].path;
        if (!folderId) {
            setSnackbar({ open: true, message: 'Invalid folder ID.', severity: 'error' });
            return;
        }

        handleMoveFiles(folderId);
        handleMoveFolders(folderId);
        handleStackClear(dispatch);
        setSnackbar({ open: true, message: 'Items moved successfully!', severity: 'success' });
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
               { isLoading ? <LinearProgress /> :
                <>
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
                </>
               }
                <div className='bottom-move-modal'>
                    <div className='move-button-container'>
                        <Button
                            variant='contained'
                            disabled={match.length !== 1 || isLoading}
                            onClick={handleMoveAction}
                            className='move-btn'
                        >
                            Move
                        </Button>
                        <Button
                            variant='contained'
                            onClick={() => handleStackClear(dispatch)}
                            className='move-btn'
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Move;
