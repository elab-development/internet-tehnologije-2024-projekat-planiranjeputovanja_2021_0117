import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Paper,
  Avatar,
} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import TextField from "../components/TextField";
import Button from "../components/Button";
import useAuth from "../hooks/useAuth";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [poruka, setPoruka] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/register",
        {
          name,
          email,
          password,
          password_confirmation: passwordConfirm,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      localStorage.setItem("token", response.data.token);
      login();
      setPoruka("Uspešna registracija!");
      navigate("/moji-planovi");
    } catch (error) {
      if (error.response?.data?.errors) {
        const poruke = Object.values(error.response.data.errors)
          .flat()
          .join(" ");
        setPoruka("Greška: " + poruke);
      } else {
        setPoruka("Greška pri registraciji. Pogledaj konzolu.");
      }
      console.error("Greška pri registraciji:", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #a1c4fd, #c2e9fb)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            backdropFilter: "blur(12px)",
            backgroundColor: "rgba(255, 255, 255, 0.75)",
            borderRadius: 3,
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOpenIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
              Registracija korisnika
            </Typography>
            <Box component="form" onSubmit={handleRegister} sx={{ width: "100%" }}>
              <TextField
                fullWidth
                label="Ime i prezime"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Lozinka"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Potvrdi lozinku"
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
                sx={{ mb: 3 }}
              />
              <Button type="submit" fullWidth>
                Registruj se
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
            <Typography variant="body2" sx={{ mt: 3 }}>
              Već imate nalog?{" "}
              <span
                onClick={() => navigate("/login")}
                style={{ color: "#1976d2", cursor: "pointer", fontWeight: "bold" }}
              >
                Prijavite se
              </span>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default RegisterPage;
