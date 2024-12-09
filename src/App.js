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
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function App() {
  const stack = useSelector((state) => state.stack.components);
  const dispatch = useDispatch();

  const [successMessage, setSuccessMessage] = useState(null);


  useEffect(() => {
    window.addEventListener('beforeunload', beforeOnLoad);
    return () => {
      window.removeEventListener('beforeunload', beforeOnLoad);
    };
  }, []);

  const beforeOnLoad = () => {
    dispatch(storeBreadCrumbs());
  };

  const handleSnackbarClose = () => {
    setSuccessMessage(null);
  };

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
            <div key={item.id}>{componentMap[item.component]}</div>
          ))}
        </div>

        <Snackbar
          open={Boolean(successMessage)}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="success">
            {successMessage}
          </Alert>
        </Snackbar>
      </div>
    </Router>
  );
}

export default App;
