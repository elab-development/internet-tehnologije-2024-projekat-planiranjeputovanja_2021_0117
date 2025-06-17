import React, { useState } from "react";
import api from "../api/axios";

function PlanGeneratorPage() {
  const [naziv, setNaziv] = useState("");
  const [troskovi, setTroskovi] = useState("");
  const [dani, setDani] = useState("");
  const [poruka, setPoruka] = useState("");
  const [plan, setPlan] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        "/user/plans",
        {
          naziv: naziv,
          ukupni_troskovi: troskovi,
          broj_dana: dani,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPlan(response.data.plan);
      setPoruka(response.data.message);
    } catch (error) {
      console.error("Greška:", error);
      setPoruka("Greška pri kreiranju plana.");
    }
  };

  return (
    <div>
      <h2>Kreiraj plan putovanja</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Naziv"
          value={naziv}
          onChange={(e) => setNaziv(e.target.value)}
        /><br />
        <input
          type="number"
          placeholder="Ukupni troškovi"
          value={troskovi}
          onChange={(e) => setTroskovi(e.target.value)}
        /><br />
        <input
          type="number"
          placeholder="Broj dana"
          value={dani}
          onChange={(e) => setDani(e.target.value)}
        /><br />
        <button type="submit">Kreiraj plan</button>
      </form>

      {poruka && <p>{poruka}</p>}

      {plan && (
        <div>
          <h3>Kreiran plan:</h3>
          <p><strong>{plan.naziv}</strong></p>
          <p>{plan.broj_dana} dana, ukupno {plan.ukupni_troskovi}€</p>
        </div>
      )}
    </div>
  );
}

export default PlanGeneratorPage;
