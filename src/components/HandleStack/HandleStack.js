// src/components/handleStack.js
import Move from '../Move/Move';
import Delete from '../Delete/Delete';
import CreateFolder from '../CreateFolder/CreateFolder';
import { clearStack, pushComponent } from '../../Features/StackSlice';
import RenameFolder from '../RenameFolder/RenameFolder';
import Download from '../Download/Download';
import UploadFileDetails from '../UploadFileDetails/UploadFileDetails';
import ActionListCard from '../ActionListCard/ActionListCard';
import { clearSelectedIds } from '../../Features/Extra';
import SessionExpiredModal from '../SessionExpiredModal/SessionExpiredModal';


export const componentMap = {
  Move: <Move />,
  Delete: <Delete />,
  CreateFolder: <CreateFolder />,
  ActionListCard:<ActionListCard/>,
  UploadFileDetails:<UploadFileDetails/>,
  RenameFolder: <RenameFolder />,
  Download: <Download />,
  SessionExpiredModal:<SessionExpiredModal/>
};


export const handleStackClear = (dispatch) => {
    dispatch(clearStack());
    dispatch(clearSelectedIds());
};


const handleStack = (key, dispatch) => {
  const stackComponents = {
      Move: 'Move',
      Delete: 'Delete',
      UploadFileDetails:'UploadFileDetails',
      ActionListCard:'ActionListCard',
      CreateFolder: 'CreateFolder',
      RenameFolder: 'RenameFolder',
      Download: 'Download',
      SessionExpiredModal:'SessionExpiredModal'
  };

  if (stackComponents[key]) {
      dispatch(pushComponent({ id: key, component: stackComponents[key] }));
  } else {
      console.warn(`No component found for key: ${key}`);
  }
};

export default handleStack;
