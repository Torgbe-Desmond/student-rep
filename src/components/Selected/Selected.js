import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Selected.css';
import SearchIcon from '@mui/icons-material/Search';
import { toggleActive } from '../../Features/Extra';

function Selected() {
  const dispatch = useDispatch();
  const activeSearch = useSelector(state => state.extra.activeSearch);

  return (
    <div className="Selected-container">
      <div className={`list-selected ${activeSearch === true && 'search-active'}`} onClick={() => dispatch(toggleActive())}>
        <SearchIcon />
      </div>
    </div>
  );
}

export default Selected;
