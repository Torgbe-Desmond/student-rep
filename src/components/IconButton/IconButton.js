
import { Button } from '@mui/material';

const IconButton = ({ onClick, disabled, children }) => {
  return (
    <Button  onClick={onClick} className='options-item' disabled={disabled}>
      {children}
    </Button>
  );
};

export default IconButton;
