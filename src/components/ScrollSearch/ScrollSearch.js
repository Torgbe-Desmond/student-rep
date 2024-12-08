import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, InputBase, Box } from '@mui/material';

export default function ScrollSearch() {
  const [showSearch, setShowSearch] = useState(false);

  const handleScroll = () => {
    console.log('scrolling')
    const scrollThreshold = 150; // Show search bar after scrolling 150px
    if (window.scrollY > scrollThreshold) {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  };

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {showSearch && (
        <AppBar position="fixed" sx={{ top: 0, backgroundColor: '#2196f3'}}>
          <Toolbar>
            <Box
              sx={{
                backgroundColor: '#fff',
                borderRadius: 2,
                padding: '0 10px',
                width: '100%',
                height:'50px'
              }}
            >
              <InputBase
                placeholder="Search..."
                fullWidth
                sx={{ color: 'black' }}
              />
            </Box>
          </Toolbar>
        </AppBar>
      )}

    </div>
  );
}
