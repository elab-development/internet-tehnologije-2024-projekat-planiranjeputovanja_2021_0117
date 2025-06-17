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
