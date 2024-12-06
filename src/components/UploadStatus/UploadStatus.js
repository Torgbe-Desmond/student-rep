import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { Typography } from '@mui/material';

export default function UploadStatus() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
            
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: '100%', margin:1 }}>
     <Typography sx={{color:"#000"}}>[ 1 / 2 ] Document.pdf </Typography><LinearProgress variant="determinate" value={progress} />
    </Box>
  );
}
