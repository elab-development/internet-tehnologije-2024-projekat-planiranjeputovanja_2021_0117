import { useState, useEffect } from "react";

function useAuth() {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken !== token) {
      setToken(storedToken);
    }
  }, []);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const isLoggedIn = !!token;

  return {
    token,
    isLoggedIn,
    login,
    logout,
  };
}

export default useAuth;
