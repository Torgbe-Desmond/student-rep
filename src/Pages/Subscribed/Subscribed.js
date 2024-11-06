import React, { useEffect, useState } from 'react';
import './Subscribed.css';
import List from '../../components/List/List';
import { useDispatch, useSelector } from 'react-redux';
import { clearFilesAndFolders, getAdirectory, getFilesInFolder } from '../../Features/WorkSpace';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { pushComponent } from '../../Features/StackSlice';
import { addBreadCrumb } from '../../Features/PathSlice';
import FolderOffOutlinedIcon from '@mui/icons-material/FolderOffOutlined';
import { Button } from '@mui/material';

const Subscribed = () => {
    const [filesAndFolders, setFilesAndFolders] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const dispatch = useDispatch();
    const search = useSelector(state => state.extra.search);
    const { folders, files, status,getFileStatus } = useSelector(state => state.work);
    const { directoryId, reference_Id } = useParams();

    useEffect(() => {
        // Fetch directory data and add breadcrumb
        dispatch(getAdirectory({ reference_Id, directoryId }));
        dispatch(getFilesInFolder({reference_Id, directoryId}))
        dispatch(addBreadCrumb({ directoryId }));

        // Clean up files and folders on component unmount
        return () => {
            dispatch(clearFilesAndFolders());
            setFilesAndFolders([]);
            setFilteredData([]);
        };
    }, [reference_Id, directoryId, dispatch]);

    useEffect(() => {
        // Combine folders and files into one array
        let filesAndFoldersArray = [];
        if (folders?.length > 0) {
            filesAndFoldersArray = [...folders];
        }
        if (files?.length > 0) {
            filesAndFoldersArray = [...filesAndFoldersArray, ...files];
        }
        setFilesAndFolders(filesAndFoldersArray);
    }, [folders, files]);

    useEffect(() => {
        // Filter data based on search query
        if (search) {
            setFilteredData(
                filesAndFolders.filter(file =>
                    file.name.toLowerCase().includes(search.toLowerCase())
                )
            );
        } else {
            setFilteredData(filesAndFolders);
        }
    }, [search, filesAndFolders]);

    const handleStack = (stack) => {
        dispatch(pushComponent({ id: stack, component: stack }));
    };

    
    const handleRefresh = ()=>{
        dispatch(getAdirectory({ reference_Id, directoryId }));
    }


    return (
        <div className={status === 'loading' ? 'data-loading' : 'subscribed-container'}>
            {status === 'loading' ? (
                <div className='loading-container'>
                    <CircularProgress sx={{color:'#FFF'}} />
                </div>
            ) : status === 'failed' ? (
                <div className='error-container'>
                <p className='error-message'>Failed to load data. Please try again later. <Button variant='outlined' onClick={()=>handleRefresh()}>Refresh</Button></p>
            </div>
            ) : (
                filteredData.length > 0 ? (
                    <List data={filteredData} />
                ) : (
                    <div className="empty-folder-message">
                        <FolderOffOutlinedIcon sx={{ fontSize: 200,color:'#FFF'  }} />
                    </div>
                )
            )}
        </div>
    );
};

export default Subscribed;
