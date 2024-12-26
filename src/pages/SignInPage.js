import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";

const SignInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch("http://localhost:8080/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials or server error");
      }

      const data = await response.json();

      localStorage.setItem("jwtToken", data.jwtToken);
      localStorage.setItem("username", data.username);

      navigate("/");
    } catch (error) {
      setError(error.message || "An error occurred during sign-in.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Sign In
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ mt: 3 }}
        onSubmit={handleSignIn}
      >
        <TextField
          fullWidth
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          type="submit"
        >
          Sign In
        </Button>
      </Box>
    </Container>
  );
};

export default SignInPage;
