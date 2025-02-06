import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Snackbar,
  Alert,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import "./PasswordUpdate.css";
import { useDispatch, useSelector } from "react-redux";
import { getVerificationToken, updatePassword } from "../../Features/AuthSlice";
import { useNavigate, useParams } from "react-router-dom";

const PasswordUpdate = () => {
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const updatePasswordStatus = useSelector(
    (state) => state.auth.updatePasswordStatus
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { reference_Id } = useParams();
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    if (reference_Id) {
      dispatch(getVerificationToken({ reference_Id }));
    }

    return () => {
      localStorage.removeItem("verificationToken");
    };
  }, [dispatch, reference_Id]);

  useEffect(() => {
    if (updatePasswordStatus === "succeeded") {
      navigate("/");
    }
  }, [updatePasswordStatus]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { newPassword, confirmPassword } = passwords;

    if (!newPassword || !confirmPassword) {
      setSnackbarMessage("Both fields are required");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    if (newPassword.length < 6) {
      setSnackbarMessage("Password must be at least 6 characters long");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setSnackbarMessage("Passwords do not match");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    dispatch(updatePassword({ newPassword }));
    setPasswords({ newPassword: "", confirmPassword: "" });
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const darkMode = {
    color: isDarkMode ? "#FFF" : "",
    "& .MuiInputBase-input": {
      color: isDarkMode ? "#FFF" : "",
      background: isDarkMode ? "#555" : "",
    },
    "& .MuiInputBase-input::placeholder": {
      color: isDarkMode ? "#FFF" : "",
    },
  };

  return (
    <div className="password-update-container">
      <Container maxWidth="sm">
        <Box
          mt={4}
          p={4}
          sx={{
            background: "#FFF",
            borderRadius: "8px",
            backgroundColor: "transparent",
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Update Password
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              sx={darkMode}
              placeholder="New Password"
              name="newPassword"
              type="password"
              value={passwords.newPassword}
              onChange={handleChange}
              disabled={updatePasswordStatus === "loading"}
              fullWidth
              margin="normal"
            />
            <TextField
              sx={darkMode}
              placeholder="Confirm Password"
              name="confirmPassword"
              type="password"
              value={passwords.confirmPassword}
              onChange={handleChange}
              fullWidth
              disabled={updatePasswordStatus === "loading"}
              margin="normal"
            />
            <Button
              type="submit"
              sx={{ marginTop: 3, height: "50px" }}
              variant="contained"
              color="primary"
              fullWidth
            >
              {updatePasswordStatus === "loading" ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Update Password"
              )}
            </Button>
          </form>
        </Box>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default PasswordUpdate;
