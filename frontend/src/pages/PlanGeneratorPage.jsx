import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Paper,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import Navbar from "../components/Navbar";
import Breadcrumbs from "../components/Breadcrumbs";
import api from "../api/axios";

function PlanGeneratorPage() {
  const [naziv, setNaziv] = useState("");
  const [troskovi, setTroskovi] = useState("");
  const [dani, setDani] = useState("");
  const [poruka, setPoruka] = useState("");
  const [plan, setPlan] = useState(null);

  const [destinacije, setDestinacije] = useState([]);
  const [destinacijaId, setDestinacijaId] = useState("");
  const [brojDanaAuto, setBrojDanaAuto] = useState("");
  const [budzet, setBudzet] = useState("");
  const [autoPoruka, setAutoPoruka] = useState("");
  const [autoPlan, setAutoPlan] = useState(null);

  useEffect(() => {
    const fetchDestinacije = async () => {
      try {
        const response = await api.get("/destinacije");
        setDestinacije(response.data);
      } catch (error) {
        console.error("Greška pri učitavanju destinacija:", error);
      }
    };
    fetchDestinacije();
  }, []);

  const handleSubmitManual = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        "/user/plans",
        {
          naziv: naziv,
          ukupni_troskovi: troskovi,
          broj_dana: dani,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPlan(response.data.plan);
      setPoruka(response.data.message);
    } catch (error) {
      console.error("Greška:", error);
      setPoruka("Greška pri kreiranju plana.");
    }
  };

  const handleSubmitAuto = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        "/user/plans/generate",
        {
          destinacija_id: parseInt(destinacijaId),
          broj_dana: parseInt(brojDanaAuto),
          budzet: parseFloat(budzet),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAutoPlan(response.data.plan);
      setAutoPoruka(response.data.message);
    } catch (error) {
      console.error("Greška pri generisanju:", error);
      setAutoPoruka("Greška pri generisanju plana.");
    }
  };

  const buttonStyles = {
    mt: 2,
    fontWeight: "bold",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "scale(1.02)",
      backgroundColor: "#115293",
    },
  };

  return (
    <>
      <Navbar />
      <Container
        sx={(theme) => ({
          mt: 4,
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: 3,
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          fontFamily: "'Inter', sans-serif",
        })}
      >
        <Breadcrumbs items={["Početna", "Kreiraj plan"]} />
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{ color: "primary.main", mb: 4 }}
        >
          Kreiraj plan putovanja
        </Typography>

        <Grid container spacing={3}>
          {/* Ručna forma */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={(theme) => ({
                p: 3,
                borderRadius: 3,
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                transition: "transform 0.3s, box-shadow 0.3s",
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 10px 24px rgba(0, 0, 0, 0.2)",
                },
              })}
            >
              <Typography variant="h6" fontWeight="bold" sx={{ color: "primary.main", mb: 2 }}>
                Ručno kreiranje plana
              </Typography>
              <form onSubmit={handleSubmitManual}>
                <TextField
                  fullWidth
                  label="Naziv"
                  value={naziv}
                  onChange={(e) => setNaziv(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Ukupni troškovi"
                  type="number"
                  value={troskovi}
                  onChange={(e) => setTroskovi(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Broj dana"
                  type="number"
                  value={dani}
                  onChange={(e) => setDani(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button fullWidth variant="contained" type="submit" sx={buttonStyles}>
                  Kreiraj plan
                </Button>
              </form>
              {poruka && <Typography sx={{ mt: 2 }}>{poruka}</Typography>}
              {plan && (
                <Box mt={2}>
                  <Typography fontWeight="bold">{plan.naziv}</Typography>
                  <Typography>
                    {plan.broj_dana} dana, {plan.ukupni_troskovi}€
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Auto generator */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={(theme) => ({
                p: 3,
                borderRadius: 3,
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                transition: "transform 0.3s, box-shadow 0.3s",
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 10px 24px rgba(0, 0, 0, 0.2)",
                },
              })}
            >
              <Typography variant="h6" fontWeight="bold" sx={{ color: "primary.main", mb: 2 }}>
                Generiši plan automatski
              </Typography>
              <form onSubmit={handleSubmitAuto}>
                <TextField
                  fullWidth
                  select
                  label="Izaberi destinaciju"
                  value={destinacijaId}
                  onChange={(e) => setDestinacijaId(e.target.value)}
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="">-- Odaberi --</MenuItem>
                  {destinacije.map((d) => (
                    <MenuItem key={d.id} value={d.id}>
                      {d.naziv}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  label="Broj dana"
                  type="number"
                  value={brojDanaAuto}
                  onChange={(e) => setBrojDanaAuto(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Budžet"
                  type="number"
                  value={budzet}
                  onChange={(e) => setBudzet(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button fullWidth variant="contained" type="submit" sx={buttonStyles}>
                  Generiši plan
                </Button>
              </form>
              {autoPoruka && <Typography sx={{ mt: 2 }}>{autoPoruka}</Typography>}
              {autoPlan && (
                <Box mt={2}>
                  <Typography fontWeight="bold">{autoPlan.naziv}</Typography>
                  <Typography>
                    {autoPlan.broj_dana} dana, {autoPlan.ukupni_troskovi}€
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default PlanGeneratorPage;
