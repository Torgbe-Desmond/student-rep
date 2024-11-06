// src/components/handleStack.js
import Move from '../Move/Move';
import Delete from '../Delete/Delete';
import CreateFolder from '../CreateFolder/CreateFolder';
import LoadingBar from '../LoadingBar/LoadingBar';
import { clearStack, pushComponent } from '../../Features/StackSlice';
import RenameFolder from '../RenameFolder/RenameFolder';
import Download from '../Download/Download';
import Failed from '../Failed/Failed';
import UploadFileDetails from '../UploadDetailModal/UploadFileDetails';
import NotifyOverlay from '../NotifyOverlay/NotifyOverlay';
import { clearSelectedIds } from '../../Features/Extra';

export const componentMap = {
  Move: <Move />,
  Delete: <Delete />,
  LoadingBar: <LoadingBar />,
  CreateFolder: <CreateFolder />,
  RenameFolder: <RenameFolder />,
  Download: <Download />,
  Failed: <Failed />,
  UploadFileDetails: <UploadFileDetails />,
  NotifyOverlay: <NotifyOverlay />
};


export const handleStackClear = (dispatch) => {
    dispatch(clearStack());
    dispatch(clearSelectedIds());
};


const handleStack = (key, dispatch) => {
  const stackComponents = {
      Move: 'Move',
      Delete: 'Delete',
      LoadingBar: 'LoadingBar',
      CreateFolder: 'CreateFolder',
      RenameFolder: 'RenameFolder',
      Download: 'Download',
      Failed: 'Failed',
      UploadFileDetails: 'UploadFileDetails',
      NotifyOverlay: 'NotifyOverlay',
  };

  if (stackComponents[key]) {
      dispatch(pushComponent({ id: key, component: stackComponents[key] }));
  } else {
      console.warn(`No component found for key: ${key}`);
  }
};

export default handleStack;
