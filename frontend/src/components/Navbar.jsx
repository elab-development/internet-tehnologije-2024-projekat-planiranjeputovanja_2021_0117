import React from "react";
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabChange = (event, newValue) => {
    navigate(newValue);
  };

  return (
    <AppBar position="static" sx={{
        background: "linear-gradient(90deg, #e3f2fd, #bbdefb)",
        color: "#0d47a1",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        backdropFilter: "blur(12px)",
      }} elevation={3}>
      <Toolbar sx={{ px: 3 }}>
        <Typography variant="h6" sx={{ flexGrow: 1, color: "#0d47a1", fontWeight: "bold", }}>
          Planiranje Putovanja
        </Typography>
        <Tabs
          value={
            location.pathname === "/moji-planovi"
              ? "/moji-planovi"
              : location.pathname === "/destinacije"
              ? "/destinacije"
              : false
          }
          onChange={handleTabChange}
          textColor="inherit"
          indicatorColor="secondary"
        >
          <Tab label="Moji planovi" value="/moji-planovi" />
          <Tab label="Destinacije" value="/destinacije" />
        </Tabs>
        <Box ml={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/plan")}
          >
            Kreiraj plan
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
