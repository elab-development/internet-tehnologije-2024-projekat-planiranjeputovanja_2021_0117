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
        headers: { Authorization: `Bearer ${token}` },
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
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedPlan(response.data.plan);
      setPoruka("Plan uspešno učitan.");
    } catch (error) {
      console.error("Greška pri pregledu plana:", error);
      setPoruka("Plan nije pronađen ili nemate pristup.");
    }
  };

  const handleChange = (e) => {
    setSelectedPlan({ ...selectedPlan, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.put(
        `/user/plans/${selectedPlan.id}`,
        {
          naziv: selectedPlan.naziv,
          ukupni_troskovi: selectedPlan.ukupni_troskovi,
          broj_dana: selectedPlan.broj_dana,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPoruka("Plan uspešno izmenjen.");
      fetchPlans();
    } catch (error) {
      console.error("Greška pri izmeni:", error);
      setPoruka("Greška pri izmeni plana.");
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
          <h3>Izmena plana:</h3>
          <label>
            Naziv:
            <input
              type="text"
              name="naziv"
              value={selectedPlan.naziv}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Broj dana:
            <input
              type="number"
              name="broj_dana"
              value={selectedPlan.broj_dana}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Ukupni troškovi (€):
            <input
              type="number"
              name="ukupni_troskovi"
              value={selectedPlan.ukupni_troskovi}
              onChange={handleChange}
            />
          </label>
          <br />
          <button onClick={handleUpdate}>Sačuvaj izmene</button>
        </div>
      )}
    </div>
  );
}

export default MyPlansPage;
