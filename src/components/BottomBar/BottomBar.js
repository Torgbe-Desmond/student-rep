import React, { useEffect, useState } from 'react';
import './ButtomBar.css';
import { Link, useLocation } from 'react-router-dom';
import { handleStackClear } from '../HandleStack/HandleStack';
import { useDispatch, useSelector } from 'react-redux';
import { navigationItems } from '../HandleNavigation/HandleNavigation';
import { setActiveButtomTab } from '../../Features/ActiveTabSlice';

function ButtomBar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const activeTab = useSelector(state => state.activeTab.activeButtomTab);
  const [currentTab,setCurrentTab] = useState('');
  const [pathHistory,setPathHistory] = useState({
    initialPath:'',
    secondaryPath:[]
  })


  const initialPath = location.pathname.split('/')

  const clearStack = () => handleStackClear(dispatch);

  const handleTabClick = (label) => {
    clearStack();
    dispatch(setActiveButtomTab(label));
  };

  useEffect(()=>{
    


    //  dispatch()
  },[currentTab])

  return (
    <div className='buttom-bar-container'>
      <div className="buttom-bar">
        <ul>
          <li className='search'>
            <input type='text' className='search-item' placeholder='Search folder or file' />
          </li>
          {navigationItems.map((item, index) => (
            <li
              key={index}
              className={`buttom-bar-item ${activeTab === item.label ? 'active' : ''}`}
              // onClick={()=>{setCurrentTab(activeTab)}}
            >
              <Link className='buttom-link' onClick={() => handleTabClick(item.label)} to={item.path}>
                <div className='icon'>{item.icon}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ButtomBar;
