import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import api from "../api/axios"; 
import useAuth from "../hooks/useAuth";


function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [poruka, setPoruka] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      const token = response.data.token;
      login(token);
      setPoruka("Uspešna prijava!");
      navigate("/moji-planovi");
    } catch (error) {
      setPoruka("Greška pri prijavi: " + (error.response?.data?.message || "Došlo je do greške"));
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #a1c4fd, #c2e9fb)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.75)",
            p: 4,
            borderRadius: 3,
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
              Prijava korisnika
            </Typography>

            <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                type="password"
                label="Lozinka"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2, borderRadius: 2 }}
              >
                Prijavi se
              </Button>

              {poruka && (
                <Typography
                  color={poruka.includes("Uspešna") ? "green" : "error"}
                  align="center"
                  sx={{ mt: 2 }}
                >
                  {poruka}
                </Typography>
              )}
            </Box>

            <Typography variant="body2" sx={{ mt: 2 }}>
              Nemate nalog?{" "}
              <span
                onClick={() => navigate("/register")}
                style={{
                  color: "#1976d2",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Registrujte se
              </span>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default LoginPage;
