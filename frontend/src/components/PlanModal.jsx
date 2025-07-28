import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";

function PlanModal({ plan, open, onClose }) {
  const [convertedValue, setConvertedValue] = useState(null);
  const [loading, setLoading] = useState(false);

  const convertToRSD = async (amountEUR) => {
    if (!amountEUR || isNaN(amountEUR)) {
      setConvertedValue("Nevalidan iznos.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://v6.exchangerate-api.com/v6/ee36a6f027be129d252689de/latest/USD");
      const data = await response.json();

      if (data.result === "success") {
        const eurRate = data.conversion_rates.EUR;
        const rsdRate = data.conversion_rates.RSD;

        if (eurRate && rsdRate) {
          const rsd = (rsdRate / eurRate) * amountEUR;
          setConvertedValue(`${rsd.toFixed(2)} RSD`);
        } else {
          setConvertedValue("Greška pri pronalaženju kurseva.");
        }
      } else {
        setConvertedValue("Greška pri odgovoru API-ja.");
      }
    } catch (err) {
      console.error("Greška pri konverziji:", err);
      setConvertedValue("Greška pri konverziji.");
    } finally {
      setLoading(false);
    }
  };

  if (!plan) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold", color: "primary.main" }}>
        Detalji plana
      </DialogTitle>
      <DialogContent dividers>
        <Typography><strong>Naziv:</strong> {plan.naziv}</Typography>
        <Typography><strong>Broj dana:</strong> {plan.broj_dana}</Typography>
        <Typography><strong>Ukupni troškovi:</strong> {plan.ukupni_troskovi} €</Typography>
        <Typography><strong>Kreiran:</strong> {new Date(plan.created_at).toLocaleString()}</Typography>

        <Button
          variant="outlined"
          onClick={() => convertToRSD(plan.ukupni_troskovi)}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={20} /> : "Konvertuj u RSD"}
        </Button>

        {convertedValue && (
          <Typography sx={{ mt: 2 }}>
            <strong>Vrednost u dinarima:</strong> {convertedValue}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Zatvori
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PlanModal;
