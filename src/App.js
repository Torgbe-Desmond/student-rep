import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./Pages/Main/Main";
import Login from "./Pages/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { componentMap } from "./components/HandleStack/HandleStack";
import Register from "./Pages/Register/Register";
import ForgotPasswordPage from "./Pages/ForgotPassword/ForgotPassword";
import PasswordUpdate from "./Pages/PasswordUpdate/PasswordUpdate";
import ProtectRoutes from "./Layout/ProtectRoutes";
import { storeBreadCrumbs } from "./Features/PathSlice";
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
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState(null);
  const [theme, setTheme] = useState(AppLightTheme);
  const [themeMode, setThemeMode] = useState(IThemeMode.SYSTEM);

  const SYSTEM_THEME = useMediaQuery("(prefers-color-scheme: dark)")
    ? IThemeMode.DARK
    : IThemeMode.LIGHT;

  console.log("SYSTEM_THEME", SYSTEM_THEME);

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
        switch (SYSTEM_THEME) {
          case IThemeMode.DARK:
            setTheme(AppDarkTheme);
            break;
          case IThemeMode.LIGHT:
            setTheme(AppLightTheme);
            break;
        }
        break;
      default:
        setTheme(AppLightTheme);
        break;
    }
  }, [themeMode, SYSTEM_THEME]);

  useEffect(() => {
    if (theme.palette.mode === "dark") {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  const handleSnackbarClose = () => {
    setSuccessMessage(null);
  };

  const component = (
    <Router>
      <div>
        <Routes>
          <Route element={<ProtectRoutes />}>
            <Route path="/:reference_Id/directories" element={<Main />} />
            <Route
              path="/:reference_Id/directories/:directoryId"
              element={<Main />}
            />
          </Route>
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/:reference_Id/update-password"
            element={<PasswordUpdate />}
          />
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

  return (
    <ThemeContext.Provider value={{ theme, switchThemeMode }}>
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
