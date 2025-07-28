import React, { useEffect, useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Tooltip,
  Switch,
} from "@mui/material";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [uloga, setUloga] = useState(null);
  const { darkMode, setDarkMode } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setUloga(null);
        return;
      }

      try {
        const response = await api.get("/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUloga(response.data.prava_pristupa || "korisnik");
      } catch (error) {
        console.error("Greška pri dohvatanju korisnika:", error);
        setUloga(null);
      }
    };

    fetchUser();
  }, [token]);

  const handleLogout = async () => {
    try {
      await api.post("/user/logout", null, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error("Greška pri logout-u:", error);
    }

    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ background: "#1976d2" }}>
      <Toolbar>
        <TravelExploreIcon sx={{ mr: 1 }} />
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: "bold", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Planiranje Putovanja
        </Typography>

        {uloga !== null && (
          <Typography sx={{ mr: 3, fontStyle: "italic", fontSize: "0.9rem" }}>
            Uloga: <strong>{uloga}</strong>
          </Typography>
        )}

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Tooltip title="Prebaci temu">
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode((prev) => !prev)}
              color="default"
            />
          </Tooltip>

          <Button color="inherit" onClick={() => navigate("/moji-planovi")}>
            Moji planovi
          </Button>
          <Button color="inherit" onClick={() => navigate("/destinacije")}>
            Destinacije
          </Button>
          <Button color="inherit" onClick={() => navigate("/plan")}>
            Kreiraj plan
          </Button>

          {uloga === "admin" && (
            <Button color="inherit" onClick={() => navigate("/admin")}>
              Admin Panel
            </Button>
          )}

          {token && (
            <Tooltip title="Odjavi se">
              <IconButton color="inherit" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
