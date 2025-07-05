import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slider,
} from "@mui/material";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Breadcrumbs from "../components/Breadcrumbs";

function AllDestinationsPage() {
  const [destinacije, setDestinacije] = useState([]);
  const [poruka, setPoruka] = useState("");
  const [selektovanaDestinacija, setSelektovanaDestinacija] = useState(null);
  const [maxCena, setMaxCena] = useState(500); // filter po ceni

  const fetchDetalji = async (id) => {
    try {
      const response = await api.get(`/destinacija/${id}`);
      setSelektovanaDestinacija(response.data);
      setPoruka("");
    } catch (error) {
      console.error("Greška pri učitavanju detalja destinacije:", error);
      setPoruka("Greška pri učitavanju detalja destinacije.");
    }
  };

  useEffect(() => {
    const fetchDestinacije = async () => {
      try {
        const response = await api.get("/destinacije");
        setDestinacije(response.data.destinacije || response.data);
      } catch (error) {
        console.error("Greška pri učitavanju destinacija:", error);
        setPoruka("Greška pri učitavanju svih destinacija.");
      }
    };

    fetchDestinacije();
  }, []);

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
        <Breadcrumbs items={["Početna", "Destinacije"]} />
        <Typography
          variant="h4"
          fontWeight="bold"
          color="primary"
          gutterBottom
        >
          Sve destinacije
        </Typography>

        <Box sx={{ mt: 2, mb: 3, width: 300 }}>
          <Typography gutterBottom>
            Maksimalna cena: {maxCena}€
          </Typography>
          <Slider
            value={maxCena}
            onChange={(e, newValue) => setMaxCena(newValue)}
            min={0}
            max={1000}
            step={10}
            valueLabelDisplay="auto"
            sx={{ color: "#1976d2" }}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => (window.location.href = "/popularne-destinacije")}
          >
            Popularne destinacije
          </Button>
        </Box>


        {poruka && <Typography color="error">{poruka}</Typography>}

        {destinacije.length === 0 ? (
          <Typography>Nema dostupnih destinacija.</Typography>
        ) : (
          <Grid container spacing={3}>
            {destinacije
              .filter((dest) => dest.prosecni_troskovi <= maxCena)
              .map((dest) => (
                <Grid item xs={12} sm={6} md={4} key={dest.id}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      backgroundColor: "rgba(255,255,255,0.95)",
                      transition: "0.3s",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      "&:hover": {
                        boxShadow: "0 10px 24px rgba(0,0,0,0.2)",
                        transform: "translateY(-5px)",
                      },
                    }}
                  >
                    <Box>
                      <Typography variant="h6" fontWeight="bold" color="primary">
                        {dest.naziv}
                      </Typography>
                      <Typography>{dest.drzava}</Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Troškovi: {dest.prosecni_troskovi}€
                      </Typography>
                    </Box>
                    <Button
                      fullWidth
                      sx={{ mt: 2 }}
                      variant="outlined"
                      onClick={() => fetchDetalji(dest.id)}
                    >
                      Detalji
                    </Button>
                  </Paper>
                </Grid>
              ))}
          </Grid>
        )}

        {/* MODAL ZA DETALJE */}
        <Dialog
          open={Boolean(selektovanaDestinacija)}
          onClose={() => setSelektovanaDestinacija(null)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle color="primary" fontWeight="bold">
            Detalji destinacije
          </DialogTitle>
          <DialogContent dividers>
            {selektovanaDestinacija && (
              <>
                <Typography><strong>Naziv:</strong> {selektovanaDestinacija.naziv}</Typography>
                <Typography><strong>Država:</strong> {selektovanaDestinacija.drzava}</Typography>
                <Typography><strong>Prosečni troškovi:</strong> {selektovanaDestinacija.prosecni_troskovi} €</Typography>
                <Typography sx={{ mt: 1 }}><strong>Opis:</strong> {selektovanaDestinacija.opis}</Typography>

                {selektovanaDestinacija.znamenitosti?.length > 0 && (
                  <>
                    <Typography sx={{ mt: 2 }}><strong>Znamenitosti:</strong></Typography>
                    <ul>
                      {selektovanaDestinacija.znamenitosti.map((zn) => (
                        <li key={zn.id}>
                          <Typography>
                            <strong>{zn.naziv}</strong> – {zn.opis} (Ulaznica: {zn.cena_ulaznice} €)
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelektovanaDestinacija(null)} variant="contained">
              Zatvori
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}

export default AllDestinationsPage;
