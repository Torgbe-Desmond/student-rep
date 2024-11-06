import { useSelector } from 'react-redux'
import Options from '../Options/Options'
import Search from '../Search/Search'
import './SearchAndOptions.css'
import History from '../History/History';
import { Paper } from '@mui/material';


function SearchAndOptions(){
const activeSearch = useSelector(state=>state.extra.activeSearch);

    return (
     <>
        <div className='search-history-container'>
        <div className="SearchAndOptions-container">
             <Options/> 
            { activeSearch === true ? <Search/> : <History/> }
        </div>  
        </div>
     </>
        
    )
}

export default SearchAndOptions