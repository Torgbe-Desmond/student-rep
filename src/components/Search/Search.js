import React, { useState } from 'react';
import './Search.css';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useDispatch } from 'react-redux';
import { search } from '../../Features/Extra';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    dispatch(search(event.target.value))
  };

  return (
    <div className="search-container">
      {/* <SearchOutlinedIcon /> */}
      <input
        type='text'
        className='search-folder'
        placeholder='Search Folder'
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
}

export default Search;
