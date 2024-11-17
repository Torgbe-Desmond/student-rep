// src/components/handleStack.js
import Move from '../Move/Move';
import Delete from '../Delete/Delete';
import CreateFolder from '../CreateFolder/CreateFolder';
import { clearStack, pushComponent } from '../../Features/StackSlice';
import RenameFolder from '../RenameFolder/RenameFolder';
import Download from '../Download/Download';
import UploadFileDetails from '../UploadFileDetails/UploadFileDetails';
import ReceiveFiles from '../ReceiveFiles/ReceiveFiles'
import SessionExpiredModal from '../SessionExpiredModal/SessionExpiredModal';
import GenerateSecretCode from '../GenerateSecreteCode/GenerateSecreteCode';
import Logout from '../Logout/Logout';
import { clearSelectedIds } from '../../Features/WorkSpace';


export const componentMap = {
  Move: <Move />,
  Delete: <Delete />,
  CreateFolder: <CreateFolder />,
  UploadFileDetails:<UploadFileDetails/>,
  RenameFolder: <RenameFolder />,
  Download: <Download />,
  SessionExpiredModal:<SessionExpiredModal/>,
  ReceiveFiles:<ReceiveFiles/>,
  GenerateSecretCode:<GenerateSecretCode/>,
  Logout:<Logout/>
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
      CreateFolder: 'CreateFolder',
      RenameFolder: 'RenameFolder',
      Download: 'Download',
      SessionExpiredModal:'SessionExpiredModal',
      ReceiveFiles:'ReceiveFiles',
      GenerateSecretCode:'GenerateSecretCode',
      Logout:'Logout'
  };

  if (stackComponents[key]) {
      dispatch(pushComponent({ id: key, component: stackComponents[key] }));
  } else {
      console.warn(`No component found for key: ${key}`);
  }
};

export default handleStack;
