import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

function PlanModal({ plan, open, onClose }) {
  if (!plan) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle fontWeight="bold" color="primary">
        Detalji plana
      </DialogTitle>
      <DialogContent dividers>
        <Typography sx={{ mb: 1 }}><strong>Naziv:</strong> {plan.naziv}</Typography>
        <Typography sx={{ mb: 1 }}><strong>Broj dana:</strong> {plan.broj_dana}</Typography>
        <Typography sx={{ mb: 1 }}><strong>Ukupni troškovi:</strong> {plan.ukupni_troskovi}€</Typography>
        <Typography sx={{ mb: 1 }}><strong>Kreiran:</strong> {new Date(plan.created_at).toLocaleString()}</Typography>
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
