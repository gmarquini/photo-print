import { api } from "../services/api";
import "../styles/home-style.css";
import { useNavigate } from "react-router";
import veryImg from "../assets/VERY.png";

export function Home() {
  const navigate = useNavigate();

  async function createSession() {
    const response = await api.post("/sessions");
    console.log(response);

    const sessionId = response.data._id;

    navigate(`/sessions/${sessionId}`);
  }

  function ADMPermission() {
    const password = prompt("Informe a senha, por favor");

    if (password !== "1234") {
      alert("Acesso negado");
      return;
    }

    navigate("/admDashboard");
  }

  return (
    <main className="home-page">
      <section className="home-content">
        <p className="home-eyebrow">Seus momentos, impressos</p>
        <h1>
          <span>Very</span>
          <img src={veryImg} alt="" />
          <span>Smart Print</span>
        </h1>
        <p className="home-description">
          Transforme suas fotos favoritas em lembranças para guardar.
        </p>
        <button className="start-button" onClick={createSession}>
          Iniciar <span aria-hidden="true">→</span>
        </button>
      </section>
      <button className="for-adm-button" onClick={ADMPermission}>
        Acesso administrativo
      </button>
    </main>
  );
}
