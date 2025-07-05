import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PlanGeneratorPage from "./pages/PlanGeneratorPage";
import MyPlansPage from "./pages/MyPlansPage";
import PopularDestinationsPage from "./pages/PopularDestinationsPage";
import AllDestinationsPage from "./pages/AllDestinationsPage";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Javni pristup samo ako nije prijavljen */}
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

        {/* Zaštićene rute */}
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

        {/* Default: ako neko ukuca nešto drugo */}
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
  );
}

export default App;
