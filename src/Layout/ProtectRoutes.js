import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectRoutes = () => {
  const token = localStorage.getItem('token');
  console.log(token)
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectRoutes;
