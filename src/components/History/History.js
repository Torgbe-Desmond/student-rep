import React, { useEffect } from 'react';
import './History.css'; // Import your CSS file for styling
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFolders } from '../../Features/WorkSpace';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';

const History = () => {
  const { moveItemsArray } = useSelector(state => state.work);
  const breadCrumbs = useSelector(state => state.path.breadCrumbs);
  const navigate = useNavigate();
  
  // Current navigate function for Representation role
  const handleNavigate = (itemId) => {
    const reference_Id = localStorage.getItem('reference_Id');
    navigate(`/${reference_Id}/directories/${itemId}`);
  };


  const historyItems = breadCrumbs?.map(id => {
    return moveItemsArray.find(folder => folder._id === id);
  }).filter(item => item);

  return (
    <div className="history-container">
      <Button variant='contained'
       className='history-item' onClick={() => handleNavigate('')}>
        Home <ArrowForwardIosIcon sx={{ width: '15px', height: '15px' }} />
      </Button>
      <div className="history-list">
        {historyItems?.map(item => (
          <Button key={item._id} className="history-item" onClick={() => handleNavigate(item._id)}>
            {item.name} <ArrowForwardIosIcon sx={{ width: '15px', height: '15px' }} />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default History;
