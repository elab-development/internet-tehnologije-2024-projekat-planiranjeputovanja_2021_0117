import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PlanGeneratorPage from "./pages/PlanGeneratorPage";
import PlanAutoGeneratorPage from "./pages/PlanAutoGeneratorPage";
import MyPlansPage from "./pages/MyPlansPage";
import PopularDestinationsPage from "./pages/PopularDestinationsPage";
import AllDestinationsPage from "./pages/AllDestinationsPage";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/plan" element={<PlanGeneratorPage />} />
        <Route path="/generisi-plan" element={<PlanAutoGeneratorPage />} />
        <Route path="/moji-planovi" element={<MyPlansPage />} />
        <Route path="/popularne-destinacije" element={<PopularDestinationsPage />} />
        <Route path="/destinacije" element={<AllDestinationsPage />} />
      </Routes>
    </Router>
     
  );
}


export default App;
