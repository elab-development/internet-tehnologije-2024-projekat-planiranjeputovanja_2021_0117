import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Box,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

function PlanCard({ plan, onClick, onDelete, onDownload }) {
  const handleClick = () => {
    if (onClick) onClick(plan);
  };

  return (
    <Card
      elevation={3}
      sx={{
        p: 2,
        borderRadius: 3,
        backgroundColor: "rgba(255,255,255,0.95)",
        transition: "transform 0.3s, box-shadow 0.3s",
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
        },
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
          {plan.naziv}
        </Typography>
        <Typography variant="body2">
          {plan.broj_dana} dana – {plan.ukupni_troskovi}€
        </Typography>
      </CardContent>

      <Box mt={2}>
        <Stack spacing={1}>
          <Button
            variant="outlined"
            startIcon={<VisibilityIcon />}
            fullWidth
            onClick={handleClick}
            sx={{
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#e3f2fd" },
            }}
          >
            Detalji
          </Button>

          <Button
            variant="outlined"
            startIcon={<PictureAsPdfIcon />}
            fullWidth
            onClick={() => onDownload(plan.id)}
            sx={{
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#e3f2fd" },
            }}
          >
            Preuzmi PDF
          </Button>

          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            fullWidth
            onClick={() => onDelete(plan.id)}
            sx={{
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#ffebee" },
            }}
          >
            Obriši
          </Button>
        </Stack>
      </Box>
    </Card>
  );
}

export default PlanCard;
