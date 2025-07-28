import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import Navbar from "../components/Navbar";
import api from "../api/axios";

function AdminPanelPage() {
  const [nazivDestinacije, setNazivDestinacije] = useState("");
  const [drzava, setDrzava] = useState("");
  const [opisDestinacije, setOpisDestinacije] = useState("");

  const [nazivZnamenitosti, setNazivZnamenitosti] = useState("");
  const [opisZnamenitosti, setOpisZnamenitosti] = useState("");
  const [cenaUlaznice, setCenaUlaznice] = useState("");
  const [destinacije, setDestinacije] = useState([]);
  const [destinacijaId, setDestinacijaId] = useState("");

  const [poruka, setPoruka] = useState("");
  const [otvoriSnackbar, setOtvoriSnackbar] = useState(false);

  const token = localStorage.getItem("token");

  const handleSnackbarClose = () => setOtvoriSnackbar(false);

  const dodajDestinaciju = async () => {
    try {
      await api.post(
        "/admin/destinacije",
        {
          naziv: nazivDestinacije,
          drzava,
          opis: opisDestinacije,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPoruka("Uspešno dodata destinacija!");
      setOtvoriSnackbar(true);
      setNazivDestinacije("");
      setDrzava("");
      setOpisDestinacije("");
      ucitajDestinacije();
    } catch (error) {
      console.error(error);
      setPoruka("Greška pri dodavanju destinacije.");
      setOtvoriSnackbar(true);
    }
  };

  const dodajZnamenitost = async () => {
    if (!destinacijaId) {
      setPoruka("Izaberite destinaciju pre dodavanja znamenitosti.");
      setOtvoriSnackbar(true);
      return;
    }
    try {
      await api.post(
        "/admin/znamenitosti",
        {
          naziv: nazivZnamenitosti,
          opis: opisZnamenitosti,
          cena_ulaznice: parseFloat(cenaUlaznice),
          destinacija_id: destinacijaId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPoruka("Uspešno dodata znamenitost!");
      setOtvoriSnackbar(true);
      setNazivZnamenitosti("");
      setOpisZnamenitosti("");
      setCenaUlaznice("");
    } catch (error) {
      console.error(error);
      setPoruka("Greška pri dodavanju znamenitosti.");
      setOtvoriSnackbar(true);
    }
  };

  const ucitajDestinacije = async () => {
    try {
      const res = await api.get("/destinacije");
      setDestinacije(res.data || []);
    } catch (err) {
      console.error("Greška pri učitavanju destinacija:", err);
    }
  };

  useEffect(() => {
    ucitajDestinacije();
  }, []);

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 5 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Admin Panel
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom>
                Dodaj novu destinaciju
              </Typography>
              <TextField
                fullWidth
                label="Naziv destinacije"
                value={nazivDestinacije}
                onChange={(e) => setNazivDestinacije(e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Država"
                value={drzava}
                onChange={(e) => setDrzava(e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Opis"
                value={opisDestinacije}
                onChange={(e) => setOpisDestinacije(e.target.value)}
                margin="normal"
                multiline
              />
              <Button variant="contained" onClick={dodajDestinaciju} sx={{ mt: 2 }}>
                Dodaj destinaciju
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom>
                Dodaj novu znamenitost
              </Typography>
              <TextField
                fullWidth
                label="Naziv znamenitosti"
                value={nazivZnamenitosti}
                onChange={(e) => setNazivZnamenitosti(e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Opis"
                value={opisZnamenitosti}
                onChange={(e) => setOpisZnamenitosti(e.target.value)}
                margin="normal"
                multiline
              />
              <TextField
                fullWidth
                label="Cena ulaznice (€)"
                value={cenaUlaznice}
                onChange={(e) => setCenaUlaznice(e.target.value)}
                margin="normal"
                type="number"
              />
              <TextField
                select
                fullWidth
                SelectProps={{ native: true }}
                value={destinacijaId}
                onChange={(e) => setDestinacijaId(Number(e.target.value))}
                margin="normal"
              >
                <option value="">Izaberi destinaciju</option>
                {destinacije.map((dest) => (
                  <option key={dest.id} value={dest.id}>
                    {dest.naziv} - {dest.drzava}
                  </option>
                ))}
              </TextField>

              <Button variant="contained" onClick={dodajZnamenitost} sx={{ mt: 2 }}>
                Dodaj znamenitost
              </Button>
            </Paper>
          </Grid>
        </Grid>

        <Snackbar
          open={otvoriSnackbar}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
        >
          <Alert severity="info" sx={{ width: "100%" }}>
            {poruka}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
}

export default AdminPanelPage;
