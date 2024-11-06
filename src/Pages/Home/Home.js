
import { useEffect } from 'react'
import './Home.css'
import { useDispatch, useSelector } from 'react-redux'
import { pushComponent } from '../../Features/StackSlice';
import handleStack from '../../components/HandleStack/HandleStack';
import { clearSearch } from '../../Features/Extra';
import { getMainDirectories } from '../../Features/WorkSpace';
import { useParams } from 'react-router-dom';

function Home(){
    const dispatch = useDispatch();
    const params = useParams();
  
    useEffect(() => {
      dispatch(getMainDirectories({ reference_Id: params.reference_Id }));
    }, [params.reference_Id, dispatch]);
  
    const handleStack = (stack) => {
      dispatch(pushComponent({ id: stack, component: stack }));
    };
  
    useEffect(() => {
    //   handleStack('LoadingBar');
      return () => {
        dispatch(clearSearch());
      };
    }, [dispatch])

    return (
        <div className='home-container-inside'>
            <div className={"home-container displayContent"}>

<div className="home">
    <div className="home-item">
    <div className='left'>
    Number of folders
    </div>
    <div className='right'>
    200 folders
    </div>      
    </div>
</div>

<div className="home">
<div className="home-item">
    <div className='left'>
    Number of folders
    </div>
    <div className='right'>
    200 folders
    </div>      
    </div>
</div>

<div className="home">
<div className="home-item">
    <div className='left'>
    Number of folders
    </div>
    <div className='right'>
    200 folders
    </div>      
    </div>
</div>

<div className="home">
<div className="home-item">
    <div className='left'>
    Number of folders
    </div>
    <div className='right'>
    200 folders
    </div>      
    </div>
</div>
</div>
        </div>
    )
}


export default Home