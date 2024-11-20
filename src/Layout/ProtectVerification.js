import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectVerification = () => {
  const verificationToken = localStorage.getItem('verificationToken');

  return verificationToken ? <Outlet /> : <Navigate to="/forgot-password" />;
};

export default ProtectVerification;
