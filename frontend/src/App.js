import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PlanGeneratorPage from "./pages/PlanGeneratorPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/plan" element={<PlanGeneratorPage />} />
      </Routes>
    </Router>
     
  );
}


export default App;
