import React, { useEffect, useState } from "react";
import api from "../api/axios";

function PopularDestinationsPage() {
  const [destinacije, setDestinacije] = useState([]);
  const [poruka, setPoruka] = useState("");

  useEffect(() => {
    const fetchDestinacije = async () => {
      try {
        const response = await api.get("/popularne-destinacije");
        setDestinacije(response.data.popularne_destinacije);
      } catch (error) {
        console.error("Greška pri učitavanju destinacija:", error);
        setPoruka("Greška pri učitavanju popularnih destinacija.");
      }
    };

    fetchDestinacije();
  }, []);

  return (
    <div>
      <h2>Popularne destinacije</h2>
      {poruka && <p>{poruka}</p>}
      {destinacije.length === 0 ? (
        <p>Trenutno nema popularnih destinacija.</p>
      ) : (
        <ul>
          {destinacije.map((item) => (
            <li key={item.id} style={{ marginBottom: "1rem" }}>
              <strong>{item.destinacija.naziv}</strong> ({item.destinacija.drzava})<br />
              Posetilaca: {item.broj_posetilaca} <br />
              Prosečna ocena: {item.prosecna_ocena}/10 <br />
              Prosečni troškovi: {item.destinacija.prosecni_troskovi}€ <br />
              <em>{item.destinacija.opis}</em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PopularDestinationsPage;
