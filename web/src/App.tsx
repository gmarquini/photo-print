import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import { Home } from "./pages/Home";
import { Session } from "./pages/Session";
import { NotFoundPage } from "./pages/NotFound";
import { AllDonePage } from "./pages/AllDonePage";
import { AdmDashboard } from "./pages/AdmDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sessions/:sessionId" element={<Session />} />
        <Route path="/notFound" element={<NotFoundPage />} />
        <Route path="/admDashboard" element={<AdmDashboard />} />

        <Route path="/*" element={<NotFoundPage />} />
        <Route
          path="/sessions/:sessionId/allDonePage"
          element={<AllDonePage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
