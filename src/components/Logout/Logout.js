import React, { useState, useEffect } from 'react';
import { Button, LinearProgress } from '@mui/material';
import './Logout.css';
import { handleStackClear } from '../HandleStack/HandleStack';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Features/AuthSlice';

function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Check if dark mode preference is stored in localStorage
        const storedDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(storedDarkMode);
    }, []);

    const handleLogout = () => {
        setIsLoading(true);
        dispatch(logout())
            .finally(() => {
                localStorage.clear();
                setIsLoading(false);
                handleStackClear(dispatch);
                navigate('/');
            });
    };

    const toggleDarkMode = () => {
        setDarkMode(prevState => {
            const newDarkMode = !prevState;
            localStorage.setItem('darkMode', newDarkMode); // Save dark mode setting
            return newDarkMode;
        });
    };

    return (
        <div className={`logout-overlay ${darkMode ? 'dark-mode' : ''}`}>
            <div className="logout-modal">
                <div className="logout-button-container">
                    <Button 
                        onClick={handleLogout} 
                        variant="contained" 
                        color="primary" 
                        className="logout-btn"
                        disabled={isLoading}
                    >
                        Logout
                    </Button>
                    <Button 
                        onClick={() => handleStackClear(dispatch)} 
                        variant="contained" 
                        color="primary" 
                        className="cancel-btn"
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                </div>
                {isLoading ? (
                    <LinearProgress />
                ) : (
                    <p className="logout-info">Are you sure you want to logout?</p>
                )}
            </div>
        </div>
    );
}

export default Logout;
