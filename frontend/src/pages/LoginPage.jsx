import React, { useState } from "react";
import api from "../api/axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [poruka, setPoruka] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/login", {
        email: email,
        password: password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);
      setPoruka("Uspešna prijava!");
    } catch (error) {
      setPoruka("Greška pri prijavi: " + error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Prijava korisnika</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Prijavi se</button>
      </form>
      {poruka && <p>{poruka}</p>}
    </div>
  );
}

export default LoginPage;
