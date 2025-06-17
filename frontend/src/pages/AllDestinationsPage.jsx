import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function AllDestinationsPage() {
  const [destinacije, setDestinacije] = useState([]);
  const [poruka, setPoruka] = useState("");
  const [selektovanaDestinacija, setSelektovanaDestinacija] = useState(null);
  const navigate = useNavigate();

  const fetchDetalji = async (id) => {
    try {
      const response = await api.get(`/destinacija/${id}`);
      setSelektovanaDestinacija(response.data); // ispravljeno
      setPoruka("");
    } catch (error) {
      console.error("Greška pri učitavanju detalja destinacije:", error);
      setPoruka("Greška pri učitavanju detalja destinacije.");
    }
  };

  useEffect(() => {
    const fetchDestinacije = async () => {
      try {
        const response = await api.get("/destinacije");
        setDestinacije(response.data.destinacije || response.data);
      } catch (error) {
        console.error("Greška pri učitavanju destinacija:", error);
        setPoruka("Greška pri učitavanju svih destinacija.");
      }
    };

    fetchDestinacije();
  }, []);

  return (
    <div>
      <h2>Pregled svih destinacija</h2>
      <button onClick={() => navigate("/popularne-destinacije")}>
        Popularne destinacije
      </button>

      {poruka && <p>{poruka}</p>}

      {destinacije.length === 0 ? (
        <p>Nema dostupnih destinacija.</p>
      ) : (
        <ul>
          {destinacije.map((dest) => (
            <li key={dest.id} style={{ marginBottom: "1rem" }}>
              <strong>{dest.naziv}</strong> ({dest.drzava})<br />
              Troškovi: {dest.prosecni_troskovi}€ <br />
              <button onClick={() => fetchDetalji(dest.id)}>Detalji</button>
            </li>
          ))}
        </ul>
      )}

      {selektovanaDestinacija && (
        <div style={{ marginTop: "20px" }}>
          <h3>Detalji destinacije</h3>
          <p><strong>Naziv:</strong> {selektovanaDestinacija.naziv}</p>
          <p><strong>Država:</strong> {selektovanaDestinacija.drzava}</p>
          <p><strong>Prosečni troškovi:</strong> {selektovanaDestinacija.prosecni_troskovi} €</p>
          <p><strong>Opis:</strong> {selektovanaDestinacija.opis}</p>

          {selektovanaDestinacija.znamenitosti?.length > 0 && (
            <>
              <h4>Znamenitosti:</h4>
              <ul>
                {selektovanaDestinacija.znamenitosti.map((zn) => (
                  <li key={zn.id}>
                    <strong>{zn.naziv}</strong> – {zn.opis} (Ulaznica: {zn.cena_ulaznice} €)
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default AllDestinationsPage;
