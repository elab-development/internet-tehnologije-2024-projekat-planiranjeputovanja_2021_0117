import React, { useEffect, useState } from "react";
import api from "../api/axios";

function PlanAutoGeneratorPage() {
  const [destinacije, setDestinacije] = useState([]);
  const [destinacijaId, setDestinacijaId] = useState("");
  const [brojDana, setBrojDana] = useState("");
  const [budzet, setBudzet] = useState("");
  const [poruka, setPoruka] = useState("");
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    const fetchDestinacije = async () => {
      try {
        const response = await api.get("/destinacije");
        setDestinacije(response.data);
      } catch (error) {
        console.error("Greška pri učitavanju destinacija:", error);
      }
    };

    fetchDestinacije();
  }, []);

  const handleGenerate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        "/user/plans/generate",
        {
          destinacija_id: parseInt(destinacijaId),
          broj_dana: parseInt(brojDana),
          budzet: parseFloat(budzet),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPoruka(response.data.message);
      setPlan(response.data.plan);
    } catch (error) {
      console.error("Greška pri generisanju:", error);
      if (error.response && error.response.data.errors) {
        setPoruka(JSON.stringify(error.response.data.errors));
      } else {
        setPoruka("Greška pri generisanju plana.");
      }
    }
  };

  return (
    <div>
      <h2>Generiši plan putovanja</h2>
      <form onSubmit={handleGenerate}>
        <select
          value={destinacijaId}
          onChange={(e) => setDestinacijaId(e.target.value)}
        >
          <option value="">Izaberi destinaciju</option>
          {destinacije.map((dest) => (
            <option key={dest.id} value={dest.id}>
              {dest.naziv}
            </option>
          ))}
        </select><br />

        <input
          type="number"
          placeholder="Broj dana"
          value={brojDana}
          onChange={(e) => setBrojDana(e.target.value)}
        /><br />
        <input
          type="number"
          placeholder="Budžet"
          value={budzet}
          onChange={(e) => setBudzet(e.target.value)}
        /><br />
        <button type="submit">Generiši plan</button>
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

export default PlanAutoGeneratorPage;
