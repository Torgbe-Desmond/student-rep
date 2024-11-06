import React, { useEffect, useState, useCallback } from 'react';
import './Options.css';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MoveDownOutlinedIcon from '@mui/icons-material/MoveDownOutlined';
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import ForumIcon from '@mui/icons-material/Forum';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Button, Menu, MenuItem, Badge } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { clearStack, pushComponent } from '../../Features/StackSlice';
import IconButton from '../IconButton/IconButton';
import { useParams } from 'react-router-dom';
import { downloadFile } from '../../Features/WorkSpace';

function Options() {
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch();
    const selectedIs = useSelector(state => state.extra.selectedIs);
    const [status, setStatus] = useState(false);
    const { directoryId } = useParams();
    const mainFolder = JSON.parse(localStorage.getItem('mainFolder'));
    const { files, downloadData, folders } = useSelector(state => state.work);
    const reference_Id = localStorage.getItem('reference_Id');
    const forumCount = 1

    useEffect(() => {
        setStatus(selectedIs.length > 2);

        return () => {
            dispatch(clearStack());
        };
    }, [dispatch, selectedIs]);

    const findItemById = (id, itemsArray) => itemsArray.find(item => item._id === id);
    const isValidFile = item => item && item.mimetype !== 'Folder' && item.mimetype !== 'Subscription';
    const isFolderOrSubscription = item => item && (item.mimetype === 'Folder' || item.mimetype === 'Subscription');

    const fileIds = selectedIs.filter(itemId => {
        const item = findItemById(itemId, files);
        return isValidFile(item);
    });

    const folderIds = selectedIs.filter(itemId => {
        const item = findItemById(itemId, folders);
        return isFolderOrSubscription(item);
    });

    const subscription_Id = mainFolder?.find(item => item.name === 'Subscription')?._id;

    const handleClick = useCallback((event) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const handleStack = useCallback((stack, file = null) => {
        dispatch(pushComponent({ id: stack, component: stack, file }));
    }, [dispatch]);

    const handleDelete = useCallback(() => handleStack('Delete'), [handleStack]);
    const handleMove = useCallback(() => handleStack('Move'), [handleStack]);
    const handleDownload = useCallback(() => {
        dispatch(downloadFile({ reference_Id, fileId: fileIds[0] }));
        handleStack('Download');
    }, [handleStack]);

    const handleNotificationOverlay = useCallback(() => handleStack('NotifyOverlay'), [handleStack]);
    const handleRename = useCallback(() => handleStack('RenameFolder'), [handleStack]);
    const handleCreateFolder = useCallback(() => handleStack('CreateFolder'), [handleStack]);

    const handleUploadFileDetails = useCallback(() => {
        handleStack('UploadFileDetails');
    }, []);

    return (
        <div className="Options-container">
            <IconButton onClick={handleDelete} disabled={!(folderIds.length > 0 || fileIds.length > 0)}>
                <DeleteOutlineOutlinedIcon />
            </IconButton>
            <IconButton onClick={handleMove} disabled={!(folderIds.length > 0 || fileIds.length > 0)}>
                <MoveDownOutlinedIcon />
            </IconButton>
            <IconButton onClick={handleDownload} disabled={!(fileIds.length === 1)}>
                <DownloadForOfflineOutlinedIcon />
            </IconButton>
            <IconButton onClick={handleRename} disabled={!(folderIds.length === 1)}>
                <DriveFileRenameOutlineOutlinedIcon />
            </IconButton>
            <IconButton onClick={handleNotificationOverlay}>
                <Badge badgeContent={forumCount} color="primary">
                    <ForumIcon />
                </Badge>
            </IconButton>
            <Button
                className='options-item'
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertOutlinedIcon />
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className='drop-down'
                sx={{ zIndex: '9999', width: '300px' }}
            >
                <MenuItem onClick={() => { handleCreateFolder(); handleClose(); }}>Create Folder</MenuItem>
                <MenuItem onClick={() => { handleUploadFileDetails(); handleClose(); }}>Upload File</MenuItem>
                <MenuItem>Subscription</MenuItem>
            </Menu>
        </div>
    );
}

export default Options;
