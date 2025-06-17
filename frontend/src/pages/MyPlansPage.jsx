import React, { useState, useEffect } from "react";
import api from "../api/axios";

function MyPlansPage() {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [poruka, setPoruka] = useState("");

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

  const fetchPlanDetails = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get(`/user/plans/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSelectedPlan(response.data.plan);
      setPoruka("Plan uspešno učitan.");
    } catch (error) {
      console.error("Greška pri pregledu plana:", error);
      setPoruka("Plan nije pronađen ili nemate pristup.");
    }
  };

  const deletePlan = async (id) => {
    const potvrda = window.confirm("Da li ste sigurni da želite da obrišete ovaj plan?");
    if (!potvrda) return;

    try {
      const token = localStorage.getItem("token");
      await api.delete(`/user/plans/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPoruka("Plan je uspešno obrisan.");
      setSelectedPlan(null);
      fetchPlans();
    } catch (error) {
      console.error("Greška pri brisanju:", error);
      setPoruka("Došlo je do greške pri brisanju plana.");
    }
  };

  const sharePlan = async (id) => {
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

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div>
      <h2>Moji planovi putovanja</h2>
      {poruka && <p>{poruka}</p>}

      {plans.length === 0 ? (
        <p>Nemate nijedan plan.</p>
      ) : (
        <ul>
          {plans.map((plan) => (
            <li key={plan.id}>
              {plan.naziv} — {plan.broj_dana} dana — {plan.ukupni_troskovi}€
              <button onClick={() => fetchPlanDetails(plan.id)}>Detalji</button>
              <button onClick={() => deletePlan(plan.id)} style={{ marginLeft: "10px" }}>
                Obriši
              </button>
              <button onClick={() => sharePlan(plan.id)} style={{ marginLeft: "10px" }}>
                Podeli (PDF)
              </button>
            </li>
          ))}
        </ul>
      )}

      {selectedPlan && (
        <div style={{ marginTop: "20px" }}>
          <h3>Detalji plana:</h3>
          <p><strong>Naziv:</strong> {selectedPlan.naziv}</p>
          <p><strong>Ukupni troškovi:</strong> {selectedPlan.ukupni_troskovi} €</p>
          <p><strong>Broj dana:</strong> {selectedPlan.broj_dana}</p>
          <p><strong>Kreiran:</strong> {new Date(selectedPlan.created_at).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

export default MyPlansPage;
