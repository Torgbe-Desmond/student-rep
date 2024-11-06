// src/components/LoadingBar.js
import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from  '@mui/material/CircularProgress'
import Box from '@mui/material/Box';
import './LoadingBar.css'
import { useDispatch } from 'react-redux';
import { clearStack } from '../../Features/StackSlice';

const LoadingBar = ({ loading }) => {
  const dispatch = useDispatch();

  const handleStackClear = () =>{
      dispatch(clearStack())
  }

  return (
    <div className='loading-overlay'>
        <div className='loading-modal'>
        <Box sx={style}>
          {true ? <CircularProgress sx={loadingStyle}/> : null }
        </Box>
        </div>
    </div>
  );
};


const style = { 
  width: '100%',
  fontSize:'50px',
  color:'blue',
  display:'flex',
  justifyContent:'center',
  alignItems:'center' 
}

const loadingStyle = {
  height:'200px',
  width:'200px',
  fontSize:'24px',
  // color:'red'
}

export default LoadingBar;
