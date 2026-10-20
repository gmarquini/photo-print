import { useNavigate } from "react-router";
import cameraIcon from "../assets/photo-camera.svg";
import "../styles/not-found-page.css";

export function NotFoundPage() {
  const navigate = useNavigate();

  function returnToHome() {
    navigate("/");
  }

  return (
    <div className="not-found-page">
      <img src={cameraIcon} alt="" />
      <p>Você está perdido?</p>
      <h1>Página não encontrada (404)</h1>
      <button onClick={returnToHome}>Voltar</button>
    </div>
  );
}
