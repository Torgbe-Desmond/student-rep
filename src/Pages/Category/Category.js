import React, { useState } from 'react';
import { Button, Paper, Typography, LinearProgress } from '@mui/material';
import './Category.css';
import { useNavigate } from 'react-router-dom';
import FolderOffOutlinedIcon from '@mui/icons-material/FolderOffOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';




function Category() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleButtonClick = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        navigate(`/login`)
    };

    const handleStudentButtonClick = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        navigate(`/student-login`)
    };

    return (
        <div className="category-container">
            <Typography variant="h5" className="login-text">CHOOSE A CATEGORY TO BEGIN</Typography>
            <Paper className="category-paper" elevation={3}>
            {loading && <LinearProgress sx={{height:'2px'}} className="loading-bar" />}
                <div className="category-buttons">
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className="category-button" 
                        onClick={handleButtonClick}
                        disabled={loading}
                    >
                        COURSE REPRESENTATION
                    </Button>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className="category-button" 
                        onClick={handleStudentButtonClick}
                        disabled={loading}
                    >
                        STUDENT
                    </Button>
                </div>
            </Paper>
        </div>
    );
}

export default Category;
