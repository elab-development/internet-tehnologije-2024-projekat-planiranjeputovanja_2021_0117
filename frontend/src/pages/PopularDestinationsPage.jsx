import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Button,
} from "@mui/material";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Breadcrumbs from "../components/Breadcrumbs";
import { getWeatherByCoords } from "../api/weather";
import { getCoordsByCity } from "../api/getCoordsByCity";

function PopularDestinationsPage() {
  const [destinacije, setDestinacije] = useState([]);
  const [poruka, setPoruka] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchDestinacije = async () => {
      try {
        const response = await api.get("/popularne-destinacije");
        const data = Array.isArray(response.data)
          ? response.data
          : response.data.popularne_destinacije || [];
        setDestinacije(data);
      } catch (error) {
        console.error("Greška pri učitavanju destinacija:", error);
        setPoruka("Greška pri učitavanju popularnih destinacija.");
      }
    };

    fetchDestinacije();
  }, []);

  const handleWeatherClick = async (naziv, drzava) => {
    setSelectedCity(naziv);
    const coords = await getCoordsByCity(naziv, drzava);
    if (!coords) {
      setPoruka("Nije moguće pronaći koordinate za destinaciju.");
      setWeather(null);
      return;
    }

    const data = await getWeatherByCoords(coords.lat, coords.lon);
    setWeather(data);
  };

  return (
    <>
      <Navbar />
      <Container
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 3,
          background: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <Breadcrumbs items={["Početna", "Popularne destinacije"]} />
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Popularne destinacije
        </Typography>

        {poruka && <Typography color="error">{poruka}</Typography>}

        {!Array.isArray(destinacije) || destinacije.length === 0 ? (
          <Typography>Trenutno nema popularnih destinacija.</Typography>
        ) : (
          <Grid container spacing={3}>
            {destinacije.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    backgroundColor: "rgba(255,255,255,0.95)",
                    transition: "0.3s",
                    "&:hover": {
                      boxShadow: "0 10px 24px rgba(0,0,0,0.2)",
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    {item.destinacija?.naziv || "Nepoznat naziv"}
                  </Typography>
                  <Typography>{item.destinacija?.drzava || "Nepoznata država"}</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Posetilaca: {item.broj_posetilaca}
                  </Typography>
                  <Typography variant="body2">
                    Ocena: {item.prosecna_ocena}/10
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Troškovi: {item.destinacija?.prosecni_troskovi} €
                  </Typography>
                  <Typography variant="body2" fontStyle="italic">
                    {item.destinacija?.opis}
                  </Typography>
                  <Button
                    onClick={() =>
                      handleWeatherClick(
                        item.destinacija?.naziv,
                        item.destinacija?.drzava
                      )
                    }
                    size="small"
                    sx={{ mt: 1 }}
                  >
                    Prikaži vreme
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}

        {weather && selectedCity && (
          <Box mt={4} p={3} borderRadius={3} bgcolor="rgba(230,245,255,0.6)">
            <Typography variant="h5" fontWeight="bold">
              Trenutno vreme u {selectedCity}
            </Typography>
            <Typography>Temperatura: {weather.temperature}°C</Typography>
            <Typography>Vetar: {weather.windspeed} m/s</Typography>
            <Typography>Kod vremena: {weather.weathercode}</Typography>
          </Box>
        )}
      </Container>
    </>
  );
}

export default PopularDestinationsPage;
