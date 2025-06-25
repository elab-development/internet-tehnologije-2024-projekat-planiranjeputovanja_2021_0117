import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { Container, Typography, Grid, Box } from "@mui/material";
import Breadcrumbs from "../components/Breadcrumbs";
import PlanCard from "../components/PlanCard";
import PlanModal from "../components/PlanModal";
import Pagination from "../components/Pagination";
import Navbar from "../components/Navbar";

function MyPlansPage() {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [poruka, setPoruka] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const plansPerPage = 6;

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
  };

  const handleCloseDetails = () => {
    setSelectedPlan(null);
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
          background: "rgba(255, 255, 255, 0.75)",
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
          sx={{ color: "#1976d2", mb: 3 }}
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
      />
      </Container>
    </>
  );
}

export default MyPlansPage;
