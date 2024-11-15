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
      <IconButton
        disabled={disabled}
        color={color}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {iconType}
      </IconButton>
    </Tooltip>
  );
};

export default ButtonIcon;
