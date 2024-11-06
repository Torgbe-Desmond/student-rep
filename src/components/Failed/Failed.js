import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import './Failed.css';

function Failed({ open, handleClose }) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="failed-dialog-title"
            aria-describedby="failed-dialog-description"
        >
            <DialogTitle id="failed-dialog-title" className="failed-dialog-title">
                Error
            </DialogTitle>
            <DialogContent className="failed-dialog-content">
                <DialogContentText id="failed-dialog-description">
                    Something went wrong. Please try again.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default Failed;
