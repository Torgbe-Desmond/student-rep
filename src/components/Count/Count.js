import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Count.css';
import { clearSelectedIds } from '../../Features/Extra';

function Count() {
  const dispatch = useDispatch();
  const selectedIs = useSelector(state => state.extra.selectedIs);

  const handleClearSelectedIds = ()=>{
    dispatch(clearSelectedIds());
  }

  return (
    <div className="count-container">
      <div 
        className={selectedIs.length > 0 ? 'list-count' : 'displayContent'} 
        onClick={handleClearSelectedIds}
      >
       Clear { selectedIs?.length } 
      </div>
    </div>
  );
}

export default Count;
