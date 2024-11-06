import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Sidebar.css';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import { setCurrentDirectory } from '../../Features/PathSlice';
import { getAdirectory } from '../../Features/WorkSpace';

const Sidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [sidebarItems, setSidebarItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    try {
      const items = JSON.parse(localStorage.getItem('sidebarItems')) || [];
      setSidebarItems(items);
    } catch (error) {
      console.error('Error parsing sidebar items from localStorage', error);
    }
  }, []);

  const reference_Id = localStorage.getItem('reference_Id');

  const handleCurrentDirectory = (directoryId, itemName) => {
    dispatch(setCurrentDirectory(directoryId));
    navigate(`/${reference_Id}/${itemName.toLowerCase()}/${directoryId}`);
    // dispatch(getAdirectory({ reference_Id, directoryId })); // Dispatch getAdirectory action
  };

  const filteredItems = sidebarItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='sidebar-container'>
      <div className="sidebar">
        <ul>
          <li className='search'>
            <input
              type='text'
              className='search-item'
              placeholder='Search folder or file'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </li>
          {filteredItems.map((item) => (
            <li
              key={item._id}
              className={`sidebar-item ${location.pathname.includes(item._id) ? 'active' : ''}`}
              onClick={() => handleCurrentDirectory(item._id, item.name)}
            >
              <div className='link'>
                <div className='icon'>
                  {item.name === 'Home' && <HomeOutlinedIcon />}
                  {item.name === 'My Workspace' && <WorkOutlineOutlinedIcon />}
                  {item.name === 'Subscribed' && <SubscriptionsOutlinedIcon />}
                  {item.name === 'Downloads' && <DownloadOutlinedIcon />}
                  {item.name === 'Subscriptions' && <SubscriptionsOutlinedIcon />}
                </div>
                <span className='sidebar-name'>{item.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
