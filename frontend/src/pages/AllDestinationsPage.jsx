import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Breadcrumbs from "../components/Breadcrumbs";
import Pagination from "../components/Pagination";

function AllDestinationsPage() {
  const [destinacije, setDestinacije] = useState([]);
  const [poruka, setPoruka] = useState("");
  const [selektovanaDestinacija, setSelektovanaDestinacija] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;
  const navigate = useNavigate();

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

  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentItems = destinacije.slice(indexOfFirst, indexOfLast);

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
        <Breadcrumbs items={["Početna", "Sve destinacije"]} />
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Sve destinacije
          </Typography>
          <Button variant="contained" onClick={() => navigate("/popularne-destinacije")}>
            Popularne destinacije
          </Button>
        </Box>

        {poruka && <Typography color="error">{poruka}</Typography>}

        {currentItems.length === 0 ? (
          <Typography>Trenutno nema dostupnih destinacija.</Typography>
        ) : (
          <Grid container spacing={8} alignItems={"stretch"}>
            {currentItems.map((dest) => (
              <Grid item xs={12} sm={6} md={4} key={dest.id}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    height: "100%",
                    backgroundColor: "rgba(255,255,255,0.95)",
                    transition: "0.3s",
                    "&:hover": {
                      boxShadow: "0 10px 24px rgba(0,0,0,0.2)",
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    {dest.naziv}
                  </Typography>
                  <Typography>{dest.drzava}</Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Troškovi: {dest.prosecni_troskovi} €
                  </Typography>
                  <Button variant="outlined" onClick={() => fetchDetalji(dest.id)} fullWidth>
                    Detalji
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}

        <Box mt={4}>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(destinacije.length / perPage)}
            onPageChange={setCurrentPage}
          />
        </Box>

        {/* MODAL DETALJA */}
        <Dialog
          open={!!selektovanaDestinacija}
          onClose={() => setSelektovanaDestinacija(null)}
          fullWidth
          maxWidth="sm"
          PaperProps={{
            sx: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            },
          }}
        >

          <DialogTitle color="primary" fontWeight="bold">
            Detalji destinacije
          </DialogTitle>
          <DialogContent dividers>
            {selektovanaDestinacija && (
              <>
                <Typography>
                  <strong>Naziv:</strong> {selektovanaDestinacija.naziv}
                </Typography>
                <Typography>
                  <strong>Država:</strong> {selektovanaDestinacija.drzava}
                </Typography>
                <Typography>
                  <strong>Prosečni troškovi:</strong> {selektovanaDestinacija.prosecni_troskovi} €
                </Typography>
                <Typography>
                  <strong>Opis:</strong> {selektovanaDestinacija.opis}
                </Typography>
                {selektovanaDestinacija.znamenitosti?.length > 0 && (
                  <>
                    <Typography sx={{ mt: 2 }} fontWeight="bold">
                      Znamenitosti:
                    </Typography>
                    <ul>
                      {selektovanaDestinacija.znamenitosti.map((zn) => (
                        <li key={zn.id}>
                          {zn.naziv} – {zn.opis} (Ulaznica: {zn.cena_ulaznice} €)
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={() => setSelektovanaDestinacija(null)}>
              Zatvori
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}

export default AllDestinationsPage;
