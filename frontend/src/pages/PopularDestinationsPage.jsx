import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  TextField,
  useTheme,
} from "@mui/material";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Breadcrumbs from "../components/Breadcrumbs";
import { getWeatherByCoords } from "../api/weather";
import { getCoordsByCity } from "../api/getCoordsByCity";
import { AuthContext } from "../context/AuthContext";

function PopularDestinationsPage() {
  const theme = useTheme();
  const { user } = useContext(AuthContext);
  const [destinacije, setDestinacije] = useState([]);
  const [poruka, setPoruka] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [uloga, setUloga] = useState(null);

  const [novaDestinacijaId, setNovaDestinacijaId] = useState("");
  const [posetilaca, setPosetilaca] = useState("");
  const [ocena, setOcena] = useState("");

  useEffect(() => {
    const fetchUloga = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await api.get("/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUloga(response.data.prava_pristupa || "korisnik");
      } catch (error) {
        console.error("Greška pri dohvaćanju uloge:", error);
        setUloga(null);
      }
    };

    fetchUloga();
  }, []);

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

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setPoruka("Niste prijavljeni.");
      return;
    }

    try {
      await api.delete(`/admin/popularne-destinacije/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDestinacije((prev) => prev.filter((d) => d.id !== id));
      setPoruka("Uspešno obrisano.");
    } catch (err) {
      console.error(err);
      setPoruka("Greška pri brisanju.");
    }
  };

  const handleAdd = async () => {
    if (!novaDestinacijaId || !posetilaca || !ocena) {
      setPoruka("Popuni sva polja za dodavanje destinacije.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setPoruka("Niste prijavljeni.");
      return;
    }

    try {
      const response = await api.post(
        `/admin/popularne-destinacije`,
        {
          destinacija_id: novaDestinacijaId,
          broj_posetilaca: posetilaca,
          prosecna_ocena: ocena,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDestinacije((prev) => [...prev, response.data]);
      setPoruka("Uspešno dodata destinacija!");
      setNovaDestinacijaId("");
      setPosetilaca("");
      setOcena("");
    } catch (error) {
      console.error(error);
      setPoruka("Greška pri dodavanju destinacije.");
    }
  };

  const bgColor = theme.palette.mode === "dark" ? "#1e1e1e" : "rgba(255,255,255,0.75)";
  const cardColor = theme.palette.mode === "dark" ? "#2c2c2c" : "rgba(255,255,255,0.95)";
  const boxColor = theme.palette.mode === "dark" ? "#333" : "rgba(255,255,255,0.9)";

  return (
    <>
      <Navbar />
      <Container
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 3,
          background: bgColor,
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
                    backgroundColor: cardColor,
                    color: theme.palette.text.primary,
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
                      handleWeatherClick(item.destinacija?.naziv, item.destinacija?.drzava)
                    }
                    size="small"
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Prikaži vreme
                  </Button>
                  {uloga === "admin" && (
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(item.id)}
                    >
                      Obriši
                    </Button>
                  )}
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}

export default PopularDestinationsPage;
