import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import { Home } from "./pages/Home";
import { Session } from "./pages/Session";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sessions/:sessionId" element={<Session />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
