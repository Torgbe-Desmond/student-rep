// components/Button/ButtonIcon.js
import React from 'react';
import { IconButton } from '@mui/material';

const ButtonIcon = ({ iconType, disabled = false, color = 'default', ariaLabel, onClick }) => {
  return (
    <IconButton
      disabled={disabled}
      color={color}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {iconType}
    </IconButton>
  );
};

export default ButtonIcon;
