import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./Pages/Main/Main";
import Login from "./Pages/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import handleStack, { componentMap } from "./components/HandleStack/HandleStack";
import Register from "./Pages/Register/Register";
import ForgotPasswordPage from "./Pages/ForgotPassword/ForgotPassword";
import PasswordUpdate from "./Pages/PasswordUpdate/PasswordUpdate";
import ProtectRoutes from "./Layout/ProtectRoutes";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { AppLightTheme, AppDarkTheme } from "./components/Theme/Theme";
import { ThemeContext } from "@emotion/react";
import { useMediaQuery, ThemeProvider } from "@mui/material";

const IThemeMode = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
};

function App() {
  const stack = useSelector((state) => state.stack.components);
  
  // Work messages
  const workMessage = useSelector((state) => state.work.message);
  const workspaceErrorMessage = useSelector((state) => state.work.workspaceErrorMessage);

  // Auth messages
  const authSuccessMessage = useSelector((state) => state.auth.message);
  const authErrorMessage = useSelector((state) => state.auth.errorMessage);

  // StatusCode
  const statusCode = useSelector((state) => state.work.statusCode);

  const dispatch = useDispatch();
  
  // Separate state variables
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [theme, setTheme] = useState(AppLightTheme);
  const [themeMode, setThemeMode] = useState(IThemeMode.SYSTEM);

  const SYSTEM_THEME = useMediaQuery("(prefers-color-scheme: dark)") ? IThemeMode.DARK : IThemeMode.LIGHT;

  // Handle success messages
  useEffect(() => {
    if (authSuccessMessage) setSuccessMessage(authSuccessMessage);
  }, [authSuccessMessage]);

  useEffect(() => {
    if (workMessage) setSuccessMessage(workMessage);
  }, [workMessage]);

  // Handle error messages
  useEffect(() => {
    if (authErrorMessage) setErrorMessage(authErrorMessage);
  }, [authErrorMessage]);

  useEffect(() => {
    if (workspaceErrorMessage) setErrorMessage(workspaceErrorMessage);
  }, [workspaceErrorMessage]);

  useEffect(()=>{
    if(statusCode === 401){
      handleAction('SessionExpiredModal')
    }
  },[statusCode])


  const handleAction = useCallback(
    (actionType) => handleStack(actionType, dispatch),
    [dispatch]
  );

  const switchThemeMode = (mode) => {
    setThemeMode(mode);
  };

  useEffect(() => {
    switch (themeMode) {
      case IThemeMode.LIGHT:
        setTheme(AppLightTheme);
        break;
      case IThemeMode.DARK:
        setTheme(AppDarkTheme);
        break;
      case IThemeMode.SYSTEM:
        setTheme(SYSTEM_THEME === IThemeMode.DARK ? AppDarkTheme : AppLightTheme);
        break;
      default:
        setTheme(AppLightTheme);
    }
  }, [themeMode, SYSTEM_THEME]);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", theme.palette.mode === "dark");
    document.body.classList.toggle("light-mode", theme.palette.mode === "light");
  }, [theme]);

  const handleSnackbarClose = () => {
    setSuccessMessage(null);
  };

  const handleErrorSnackbarClose = () => {
    setErrorMessage(null);
  };

  return (
    <ThemeContext.Provider value={{ theme, switchThemeMode }}>
      <ThemeProvider theme={theme}>
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

            {/* Success Message Snackbar */}
            <Snackbar open={Boolean(successMessage)} autoHideDuration={3000} onClose={handleSnackbarClose}>
              <Alert onClose={handleSnackbarClose} severity="success">
                {successMessage}
              </Alert>
            </Snackbar>

            {/* Error Message Snackbar */}
            <Snackbar open={Boolean(errorMessage)} autoHideDuration={3000} onClose={handleErrorSnackbarClose}>
              <Alert onClose={handleErrorSnackbarClose} severity="error">
                {errorMessage}
              </Alert>
            </Snackbar>
          </div>
        </Router>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
