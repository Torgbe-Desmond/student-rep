import React, { useState } from 'react';
import {
  AppBar,
  Button,
  Dialog,
  Divider,
  FormControlLabel,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Slide,
  Switch,
  Toolbar,
  Typography,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBottomTab, } from '../../Features/PathSlice';
import './Settings.css';
import { toggleColor } from '../../Features/settingsSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Settings() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.path.bottomTab);

  const [settingsOptions, setSettingsOptions] = useState([
    {
      id: 1,
      primary: 'Set color differentiation',
      secondary: 'This makes it easy to differentiate between newly created folders and newly added files.',
      hasSwitch: true,
      enabled: false,
    },
  ]);

  const handleToggleDialog = () => {
    dispatch(toggleBottomTab());
  };

  const handleSwitchChange = (id) => {
    setSettingsOptions((prevOptions) =>
      prevOptions.map((option) => {
        if (option.id === id) {
          dispatch(toggleColor());
          return { ...option, enabled: !option.enabled };
        }
        return option;
      })
    );
  };

  return (
    <Dialog
      sx={{
        height:'100%'
      }}
      fullScreen
      open={open}
      onClose={handleToggleDialog}
      TransitionComponent={Transition}
    >
      <AppBar
        sx={{
          position: 'relative',
          backgroundColor: '#2196f3',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleToggleDialog}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flex: 1, textAlign: 'center' }}>
            Settings
          </Typography>
          <Button
            autoFocus
            color="inherit"
            onClick={() => console.log('Save clicked')}
          >
            Save
          </Button>
        </Toolbar>
      </AppBar>

      <List>
        {settingsOptions.map((option) => (
          <Box key={option.id}>
            <ListItemButton disableRipple>
              <ListItemText
                primary={option.primary}
                secondary={
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ whiteSpace: 'pre-line', maxWidth: '270px' }}
                  >
                    {option.secondary}
                  </Typography>
                }
              />
              {option.hasSwitch && (
                <FormControlLabel
                  control={
                    <Switch
                      checked={option.enabled}
                      onChange={() => handleSwitchChange(option.id)}
                    />
                  }
                  sx={{ marginRight: 2 }}
                />
              )}
            </ListItemButton>
            <Divider />
          </Box>
        ))}
      </List>
    </Dialog>
  );
}
