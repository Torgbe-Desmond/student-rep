import React, { useState } from 'react';
import { Card, CardContent, List, ListItem, ListItemIcon, ListItemText, IconButton, Button, TextField, Typography, CircularProgress } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import ShareIcon from '@mui/icons-material/Share';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import { Box, styled } from '@mui/system';
import './ActionListCard.css';
import { handleStackClear } from '../HandleStack/HandleStack';
import { useDispatch } from 'react-redux';

// Styled Card component to make it look interactive and compact
const ClickableCard = styled(Card)({
  cursor: 'pointer',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  },
});

const CompactCardContent = styled(CardContent)({
  paddingLeft: '16px',
  paddingRight: '16px',
  paddingTop: '0px',
  height: '55px',
  '&:last-child': {
    paddingBottom: '8px',
  },
});

const PopUpContainer = styled('div')({
  padding: '16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#f9f9f9',
  border: '1px solid #ccc',
  width: '400px',
  borderRadius: '8px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
});

const ActionListCard = () => {
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [showReceivePopup, setShowReceivePopup] = useState(false);
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch();
  const shareCode = "ABC123dsfsfsdasdfadf"; // Example share code

  const handleShareClick = () => {
    setShowSharePopup(true);
    setShowReceivePopup(false);
  };

  const handleReceiveClick = () => {
    setShowReceivePopup(true);
    setShowSharePopup(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareCode)
      .then(() => alert('Code copied to clipboard!'))
      .catch(err => console.error('Failed to copy: ', err));
  };

  return (
    <div className="actions-list-card-overlay">
      <div className="actions-list-card-modal">
        <ClickableCard onClick={handleShareClick} variant="outlined">
          <CompactCardContent>
            <List>
              <ListItem>
                <ListItemIcon>
                  <FolderIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Share Files" />
                <IconButton edge="end" aria-label="share">
                  <ShareIcon color="secondary" />
                </IconButton>
              </ListItem>
            </List>
          </CompactCardContent>
        </ClickableCard>

        <ClickableCard onClick={handleReceiveClick} variant="outlined">
          <CompactCardContent>
            <List>
              <ListItem>
                <ListItemIcon>
                  <FolderIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Receive Files" />
                <IconButton edge="end" aria-label="receive">
                  <CloudDownloadOutlinedIcon color="secondary" />
                </IconButton>
              </ListItem>
            </List>
          </CompactCardContent>
        </ClickableCard>
      </div>

      {showSharePopup && (
        <PopUpContainer>
          <Box sx={{ backgroundColor: 'lightblue', width: '100%', margin: 0.5, padding: 1, borderRadius:2 }}>
            <Typography variant="body1">{shareCode}</Typography>
          </Box>
          <Button variant="contained" color="primary" onClick={copyToClipboard}>
            Copy
          </Button>
          <Button variant="text" onClick={() => {
            setShowSharePopup(false)
            handleStackClear(dispatch)

            }}>
            Close
          </Button>
        </PopUpContainer>
      )}

      {showReceivePopup && (
        <PopUpContainer>
          <TextField label="Enter Code" variant="outlined" size="small" />
          {loading ? (
                <Button variant="contained" color="primary" style={{ marginLeft: '8px' }}>
                    <CircularProgress size={24} color="inherit" /> 
                </Button>

              ) : (
                 <Button variant="contained" color="primary" style={{ marginLeft: '8px' }}>
                     Receive
                 </Button>
              )}
          
          <Button variant="text" onClick={() =>{
             setShowReceivePopup(false)
             handleStackClear(dispatch)
             }}>
            Close
          </Button>
        </PopUpContainer>
      )}
    </div>
  );
};

export default ActionListCard;
