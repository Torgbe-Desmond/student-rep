import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BuildIcon from '@mui/icons-material/Build';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import handleStack from '../HandleStack/HandleStack';
import { toggleBottomTab } from '../../Features/PathSlice';
import './SimpleBottomNavigation.css'

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const [isValid, setIsValid] = React.useState(true);
  const { directoryId } = useParams();

  const handleAction = React.useCallback(
    (actionType) => handleStack(actionType, dispatch),
    [dispatch]
  );

  React.useEffect(() => {
    setIsValid(!directoryId);
  }, [directoryId]);

  const handleToggleDialog = React.useCallback(() => {
    dispatch(toggleBottomTab());
  }, [dispatch]);

  const bottomOptions = [
    // { 
    //   icon: <RestoreIcon />, 
    //   color: 'primary', 
    //   action: () => console.log('Recents clicked'), 
    //   label: 'Recents' 
    // },
    // { 
    //   icon: <FavoriteIcon />, 
    //   color: 'primary', 
    //   action: () => console.log('Favorites clicked'), 
    //   label: 'Favorites' 
    // },
    // { 
    //   icon: <BuildIcon/>, 
    //   color: 'primary', 
    //   action: () => {
    //     handleAction('Settings');
    //     handleToggleDialog();
    //   }, 
    //   label: 'Settings' 
    // },
  ];

  return (
   <div className='bottom-navigation-container'>
     <Box
      sx={{
        // width: '100%',
        // position: 'fixed',
        // bottom: 0,
        // left: 0,
        // boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        // backgroundColor: '#fffafa',
        // // zIndex: 10,
      }}
    >
      <BottomNavigation
        sx={{
            backgroundColor: '#fffafa',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        {bottomOptions.map((item, index) => {
          const { label, icon, action } = item;
          return (
            <BottomNavigationAction
              key={label} 
              label={label}
              icon={icon}
              onClick={action}
            />
          );
        })}
      </BottomNavigation>
    </Box>
   </div>
  );
}
