// components/EditPlanModal.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

function EditPlanModal({ open, plan, onClose, onSave }) {
  const [naziv, setNaziv] = useState(plan?.naziv || "");
  const [brojDana, setBrojDana] = useState(plan?.broj_dana || 0);
  const [ukupniTroskovi, setUkupniTroskovi] = useState(plan?.ukupni_troskovi || 0);

  const handleSubmit = () => {
    onSave({
      id: plan.id,
      naziv,
      broj_dana: brojDana,
      ukupni_troskovi: ukupniTroskovi,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Izmena plana</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Naziv"
          value={naziv}
          onChange={(e) => setNaziv(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          type="number"
          label="Broj dana"
          value={brojDana}
          onChange={(e) => setBrojDana(Number(e.target.value))}
          margin="normal"
        />
        <TextField
          fullWidth
          type="number"
          label="Ukupni troškovi (€)"
          value={ukupniTroskovi}
          onChange={(e) => setUkupniTroskovi(Number(e.target.value))}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Otkaži</Button>
        <Button onClick={handleSubmit} variant="contained">
          Sačuvaj
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditPlanModal;
