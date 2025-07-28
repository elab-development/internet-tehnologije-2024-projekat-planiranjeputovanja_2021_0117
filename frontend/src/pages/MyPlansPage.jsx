import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../api/axios";
import {
  Container,
  Typography,
  Grid,
  Box,
  useTheme,
  Button,
} from "@mui/material";
import Breadcrumbs from "../components/Breadcrumbs";
import PlanCard from "../components/PlanCard";
import PlanModal from "../components/PlanModal";
import EditPlanModal from "../components/EditPlanModal";
import Pagination from "../components/Pagination";
import Navbar from "../components/Navbar";

function MyPlansPage() {
  const theme = useTheme();

  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [poruka, setPoruka] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const plansPerPage = 6;
  const [editPlan, setEditPlan] = useState(null);

  const fetchPlans = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/user/plans", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlans(response.data.plans);
    } catch (error) {
      console.error("Greška pri učitavanju planova:", error);
      setPoruka("Greška pri učitavanju planova.");
    }
  };

  const handleOpenDetails = (plan) => {
    setSelectedPlan(plan);
    setConvertedAmount(null); // resetuj prethodni rezultat
  };

  const handleCloseDetails = () => {
    setSelectedPlan(null);
    setConvertedAmount(null);
  };

  const handleConvertCurrency = async () => {
    if (!selectedPlan) return;
    try {
      const response = await axios.get("https://api.exchangerate.host/convert", {
        params: {
          from: "EUR",
          to: "RSD",
          amount: selectedPlan.ukupni_troskovi,
        },
      });
      setConvertedAmount(response.data.result);
    } catch (error) {
      console.error("Greška pri konverziji:", error);
      setConvertedAmount("Greška!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Da li ste sigurni da želite da obrišete ovaj plan?")) return;
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/user/plans/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPoruka("Plan je uspešno obrisan.");
      fetchPlans();
    } catch (error) {
      console.error("Greška pri brisanju:", error);
      setPoruka("Došlo je do greške pri brisanju plana.");
    }
  };

  const handleDownloadPDF = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get(`/user/plans/${id}/share`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `plan-${id}.pdf`;
      link.click();
    } catch (error) {
      console.error("Greška pri deljenju plana:", error);
      setPoruka("Greška pri deljenju plana.");
    }
  };

  const handleEdit = (plan) => {
    setEditPlan(plan);
  };

  const handleSaveEdit = async (updatedData) => {
    try {
      const token = localStorage.getItem("token");
      await api.put(`/user/plans/${updatedData.id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPoruka("Plan uspešno izmenjen.");
      setEditPlan(null);
      fetchPlans();
    } catch (error) {
      console.error("Greška pri izmeni:", error);
      setPoruka("Greška pri izmeni plana.");
    }
  };

  // Paginacija
  const indexOfLastPlan = currentPage * plansPerPage;
  const indexOfFirstPlan = indexOfLastPlan - plansPerPage;
  const currentPlans = plans.slice(indexOfFirstPlan, indexOfLastPlan);
  const totalPages = Math.ceil(plans.length / plansPerPage);

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <>
      <Navbar />
      <Container
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 3,
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(18, 18, 18, 0.9)"
              : "rgba(255, 255, 255, 0.75)",
          color: theme.palette.text.primary,
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <Breadcrumbs items={["Početna", "Moji planovi"]} />
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{
            color: theme.palette.mode === "dark"
              ? theme.palette.primary.light
              : theme.palette.primary.main,
            mb: 3,
          }}
        >
          Moji planovi putovanja
        </Typography>

        {poruka && (
          <Typography color="error" sx={{ mb: 2 }}>
            {poruka}
          </Typography>
        )}

        {plans.length === 0 ? (
          <Typography>Nemate nijedan plan.</Typography>
        ) : (
          <>
            <Grid container spacing={3}>
              {currentPlans.map((plan) => (
                <Grid item xs={12} sm={6} md={4} key={plan.id}>
                  <PlanCard
                    plan={plan}
                    onClick={handleOpenDetails}
                    onDelete={handleDelete}
                    onDownload={handleDownloadPDF}
                    onEdit={handleEdit}
                  />
                </Grid>
              ))}
            </Grid>

            <Box mt={4}>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </Box>
          </>
        )}

        <PlanModal
          plan={selectedPlan}
          open={!!selectedPlan}
          onClose={handleCloseDetails}
          onConvert={handleConvertCurrency}
          convertedAmount={convertedAmount}
        />

        <EditPlanModal
          open={!!editPlan}
          plan={editPlan}
          onClose={() => setEditPlan(null)}
          onSave={handleSaveEdit}
        />
      </Container>
    </>
  );
}

export default MyPlansPage;
