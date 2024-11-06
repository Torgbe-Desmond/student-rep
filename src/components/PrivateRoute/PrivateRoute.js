import React from 'react';
import { Outlet } from 'react-router-dom';
import './PrivateRoute.css'

const PrivateRoute = () => {

return (
  <div >
        <div className='main'>
            <div className='inside-main'>
                 <Outlet/>
            </div>
        </div>
  </div> 
)
};

export default PrivateRoute;
