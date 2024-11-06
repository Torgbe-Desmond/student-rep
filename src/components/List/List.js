import React, { useEffect, useState } from 'react';
import './List.css';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { Button, Menu, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import { setDirectoryIds, setSelectedIds } from '../../Features/Extra';
import { useDispatch, useSelector } from 'react-redux';
import { pushComponent } from '../../Features/StackSlice';
import { useNavigate } from 'react-router-dom';
import { setCurrentDirectory } from '../../Features/PathSlice';
import { clearFilesAndFolders } from '../../Features/WorkSpace';

function List({ data }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const dispatch = useDispatch();
  const { selectedIs } = useSelector(state => state.extra);
  const currentDirectory = useSelector(state => state.path.currentDirectory);
  const reference_Id = localStorage.getItem('reference_Id');
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const [representation, setRepresentation] = useState(false);

  useEffect(() => {
    if (role === 'Representation') {
      setRepresentation(true);
    }
  }, [role]);

  const handleClick = (event, folderId) => {
    setAnchorEl(event.currentTarget);
    dispatch(setSelectedIds(folderId));
    setCurrentFolderId(folderId);
  };

  const handleStack = (stack) => {
    dispatch(pushComponent({ id: stack, component: stack }));
  };

  const handleDelete = () => {
    handleStack('Delete');
    handleClose();
  };

  const handleMove = () => {
    handleStack('Move');
    handleClose();
  };

  const handleRename = () => {
    handleStack('RenameFolder');
    handleClose();
  };

  const handleNavigate = (directoryId) => {
    dispatch(clearFilesAndFolders());
    dispatch(setCurrentDirectory(directoryId));
    navigate(`/${reference_Id}/directories/${directoryId}`);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCheckboxChange = (folderId) => {
    dispatch(setSelectedIds(folderId));
  };

  return (
    <div className='list-container'>
       <table className="list-table">
      <thead>
        <tr>
          <th>Select</th>
          <th>Name</th>
          <th>Last Updated</th>
          <th>Size</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item._id}>
            <td>
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{ color: "#000" }}
                    checked={selectedIs?.includes(item._id)}
                    onChange={() => handleCheckboxChange(item._id)}
                  />
                }
              />
            </td>
            <td>
              <div className="folder-info" onClick={() => {
                if (item.mimetype === 'Folder' || item.mimetype === 'Subscription') {
                  handleNavigate(item._id);
                }
              }}>
                {item.mimetype === 'Folder' || item.mimetype === 'Subscription' ? (
                  <FolderOpenOutlinedIcon sx={{ fontSize: 40 }} />
                ) : (
                  <InsertDriveFileOutlinedIcon className='icon-size' />
                )}
                <span className="folder-name-list">{item.originalname || item.name}</span>
              </div>
            </td>
            <td>{item.lastUpdated ? new Date(item.lastUpdated).toLocaleDateString() : '-'}</td>
            <td>{item.mimetype === 'Folder' || item.mimetype === 'Subscription' ? item.size : '-'}</td>
            <td>
              <Button 
                aria-haspopup="true"
                onClick={(event) => handleClick(event, item._id)}
              >
                <MoreVertOutlinedIcon sx={{ color: "#000" }} />
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
                <MenuItem onClick={handleMove}>Move</MenuItem>
                <MenuItem onClick={handleRename}>Rename</MenuItem>
              </Menu>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default List;
