import React, { useState } from "react";
import api from "../api/axios";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [poruka, setPoruka] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");


  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/register",
        {
          name: name,
          email: email,
          password: password,
          password_confirmation: passwordConfirm,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        }
      );

      setPoruka("Uspešna registracija!");
    } catch (error) {
      console.error("Greška pri registraciji:", error);

      if (error.response && error.response.data && error.response.data.errors) {
        const poruke = Object.values(error.response.data.errors).flat().join(" ");
        setPoruka("Greška: " + poruke);
      } else {
        setPoruka("Greška pri registraciji. Pogledaj konzolu.");
      }
    }
  };

  return (
    <div>
      <h2>Registracija korisnika</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Ime"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Lozinka"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <input
            type="password"
            placeholder="Potvrdi lozinku"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
        /><br />

        <button type="submit">Registruj se</button>
      </form>
      {poruka && <p>{poruka}</p>}
    </div>
  );
}

export default RegisterPage;
