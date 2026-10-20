import { api } from "../services/api";
import "../styles/home-style.css";
import { useNavigate } from "react-router";
import veryImg from "../assets/VERY.png";
import { Loading } from "../components/loading";
import { useEffect, useState } from "react";

export function Home() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  async function createSession() {
    const response = await api.post("/sessions");
    console.log(response);

    const sessionId = response.data._id;

    navigate(`/sessions/${sessionId}`);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="home-page">
      <h1>
        Very <img src={veryImg} alt="" /> Smart Print
      </h1>
      <button className="start-button" onClick={createSession}>
        Iniciar
      </button>
    </div>
  );
}
