import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PlanGeneratorPage from "./pages/PlanGeneratorPage";
import MyPlansPage from "./pages/MyPlansPage";
import PopularDestinationsPage from "./pages/PopularDestinationsPage";
import AllDestinationsPage from "./pages/AllDestinationsPage";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import AdminPanelPage from "./pages/AdminPanelPage";

function App() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // Dodato

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        console.error("Nevažeći user u localStorage");
      }
    }
  }, []);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#1976d2",
      },
    },
  });

  return (
    <AuthContext.Provider value={{ user, setUser, darkMode, setDarkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegisterPage />
                </PublicRoute>
              }
            />
            <Route
              path="/plan"
              element={
                <PrivateRoute>
                  <PlanGeneratorPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/moji-planovi"
              element={
                <PrivateRoute>
                  <MyPlansPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/popularne-destinacije"
              element={
                <PrivateRoute>
                  <PopularDestinationsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/destinacije"
              element={
                <PrivateRoute>
                  <AllDestinationsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <AdminPanelPage />
                </PrivateRoute>
              }
            />
            <Route
              path="*"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;
