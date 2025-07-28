import { createContext } from "react";

export const AuthContext = createContext({
  user: null,
  setUser: () => {},
  darkMode: false,
  setDarkMode: () => {},
});
