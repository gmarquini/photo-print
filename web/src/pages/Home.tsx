import { api } from "../services/api";
import "../styles/home-style.css";
import { useNavigate } from "react-router";

export function Home() {
  const navigate = useNavigate();

  async function createSession() {
    const response = await api.post("/sessions");
    console.log(response);

    const sessionId = response.data._id;

    navigate(`/sessions/${sessionId}`);
  }

  return (
    <div className="home-page" onClick={createSession}>
      <button className="start-button">Começar</button>
    </div>
  );
}
