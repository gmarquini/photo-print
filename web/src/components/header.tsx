import { useNavigate, useParams } from "react-router";
import { cancelSession } from "../utils/cancelSession";
import "../styles/header.css";

export function Header() {
  const navigate = useNavigate();
  const { sessionId } = useParams();

  return (
    <header className="header">
      <div
        title="Voltar para a página inicial"
        className="very-very-logo"
        onClick={async () => {
          if (sessionId) {
            try {
              const shouldReturn = await cancelSession(
                sessionId,
                "Deseja retornar ao início? Essa sessão será perdida.",
              );
              if (shouldReturn) {
                navigate("/", { replace: true });
                return;
              }
            } catch (error) {
              return console.log("Não foi possível cancelar a sessão", error);
            }
            return;
          }
        }}
      >
        Very <span>Very!</span> Smart Print
      </div>
    </header>
  );
}
