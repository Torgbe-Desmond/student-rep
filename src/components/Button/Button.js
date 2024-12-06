// components/Button/ButtonIcon.js
import React from 'react';
import { IconButton, Tooltip } from '@mui/material';

const ButtonIcon = ({ 
  iconType, 
  disabled = false, 
  color = 'default', 
  ariaLabel, 
  onClick 
}) => {
  return (
     <Tooltip title={ariaLabel} arrow>
      <span>
      <IconButton
        disabled={disabled}
        color={color}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {iconType}
      </IconButton>
      </span>
    </Tooltip>
  );
};

export default ButtonIcon;
