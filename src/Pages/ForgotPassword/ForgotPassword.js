import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Snackbar,
  Alert,
  LinearProgress,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import { verifyEmail } from "../../Features/AuthSlice";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.verifyEmailStatus);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      return;
    }

    dispatch(verifyEmail({ email }));
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
    <div className="forgot-password-container">
      <Container sx={{ width: "500px" }} maxWidth="sm">
        <Box
          mt={4}
          p={4}
          sx={{ background: "#FFF", backgroundColor: "transparent" }}
        >
          <Typography variant="h4" gutterBottom>
            Forgot Password ?
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              sx={darkMode}
              placeholder="Enter email"
              value={email}
              onChange={handleChange}
              fullWidth
              disabled={status === 'loading'}
              name="email"
              margin="normal"
            />

            <Button
              sx={{ marginTop: 3, height: "50px" }}
              type="submit"
              variant="contained"
              color="primary"
              disabled={status === 'loading'}
              fullWidth
            >
              {status === "loading" ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Verify Email"
              )}
            </Button>
          </form>
          <Typography align="center" sx={{ marginTop: 3 }}>
            Go back{" "}
            <Link
              to="/"
              variant="body2"
              sx={{ ml: 2 }}
              className={`${isDarkMode ? "switch" : ""}`}
            >
              Login here
            </Link>
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default ForgotPasswordPage;
