import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './Pages/Main/Main';
import Login from './Pages/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { componentMap } from './components/HandleStack/HandleStack';
import Register from './Pages/Register/Register';
import ForgotPasswordPage from './Pages/ForgotPassword/ForgotPassword';
import PasswordUpdate from './Pages/PasswordUpdate/PasswordUpdate';
import ProtectRoutes from './Layout/ProtectRoutes';
import { storeBreadCrumbs } from './Features/PathSlice';

function App() {
  const stack = useSelector((state) => state.stack.components);
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener("beforeunload", beforeOnLoad);
  }, []);

  const beforeOnLoad = ()=>{
    dispatch(storeBreadCrumbs())
  }


  return (
    <Router>
      
      <div>
        <Routes>

          <Route element={<ProtectRoutes />}>
            <Route path="/:reference_Id/directories" element={<Main />} />
            <Route path="/:reference_Id/directories/:directoryId" element={<Main />} />
          </Route>

          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          <Route path="/:reference_Id/update-password" element={<PasswordUpdate />} />

          <Route path="/" element={<Login />} />

          <Route path="/register" element={<Register />} />

      </Routes>

        <div>
          {stack.map((item) => (
            <div key={item.id}>
              {componentMap[item.component]}
            </div>
          ))}
        </div>
      </div>
    </Router>
  );
}

export default App;
