import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Box,
  useTheme,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

function PlanCard({ plan, onClick, onDelete, onDownload, onEdit }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const handleClick = () => {
    if (onClick) onClick(plan);
  };

  return (
    <Card
      elevation={3}
      sx={{
        p: 2,
        borderRadius: 3,
        backgroundColor: isDark ? "#1e1e1e" : "rgba(255,255,255,0.95)",
        color: isDark ? "#fff" : "#000",
        transition: "transform 0.3s, box-shadow 0.3s",
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: isDark
            ? "0 12px 24px rgba(255,255,255,0.1)"
            : "0 12px 24px rgba(0,0,0,0.2)",
        },
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          fontWeight="bold"
          color={isDark ? "primary.light" : "primary"}
          gutterBottom
        >
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
              color: isDark ? "#90caf9" : undefined,
              borderColor: isDark ? "#90caf9" : undefined,
              "&:hover": {
                backgroundColor: isDark ? "#2c2c2c" : "#e3f2fd",
              },
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
              color: isDark ? "#ce93d8" : undefined,
              borderColor: isDark ? "#ce93d8" : undefined,
              "&:hover": {
                backgroundColor: isDark ? "#2c2c2c" : "#f3e5f5",
              },
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
              "&:hover": {
                backgroundColor: isDark ? "#3b1c1c" : "#ffebee",
              },
            }}
          >
            Obriši
          </Button>

          <Button
            variant="outlined"
            color="primary"
            startIcon={<EditIcon />}
            fullWidth
            onClick={() => onEdit(plan)}
            sx={{
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: isDark ? "#2c2c2c" : "#e3f2fd",
              },
            }}
          >
            Izmeni
          </Button>
        </Stack>
      </Box>
    </Card>
  );
}

export default PlanCard;
