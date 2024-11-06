import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HomeLayout = () => {
  const isAuthenticated = localStorage.getItem('token')
//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;

return (
    <div>
        <Outlet/>
    </div>
)
};

export default HomeLayout;
