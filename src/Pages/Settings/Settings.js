import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Dialog,
  List,
  Slide,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBottomTab } from '../../Features/PathSlice';
import ViewPDF from '../../components/ViewPDF/ViewPDF';
import './Settings.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Settings = () => {
  const open = useSelector((state) => state.path.bottomTab);
  const { selectedFolders: selectedFolderList, folders } = useSelector(
    (state) => state.work
  );
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.darkMode);
  
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    const files = folders?.filter(
      (file) =>
        selectedFolderList.includes(file._id) &&
        file.mimetype !== 'Folder' &&
        file.mimetype !== 'Subscriptions' &&
        file.mimetype !== 'Shared'
    );
    setSelectedFiles(files || []);

    return () => {
      setSelectedFiles([]);
    };
  }, [folders, selectedFolderList]);

  const handleToggleDialog = () => {
    dispatch(toggleBottomTab());
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleToggleDialog}
      TransitionComponent={Transition}
      sx={{ backgroundColor: isDarkMode ? '#444' : '#2196f3' }}
      className="dialog-wrapper"
    >
      <List
        sx={{ backgroundColor: isDarkMode ? '#444' : '#000', overflowY: 'auto' }}
        className="list-container"
      >
        {selectedFiles.map((file) => (
          <div key={file._id} className="file-item">
            {file.mimetype.startsWith('application') && (
              <div className="pdf-holder">
                <ViewPDF 
                  uri={file}
                  handleToggleDialog={handleToggleDialog}
                />
              </div>
            )}
            {['video', 'image','Folder','Shared'].includes(file.mimetype.split('/')[0]) && (
              <div className='support'>
                <div>Unsupported file type: {file.mimetype}</div>
                <Button
                variant='contained'
                onClick={handleToggleDialog}>Go Back</Button>
              </div>
            )}
          </div>
        ))}
      </List>
    </Dialog>
  );
};

export default Settings;
