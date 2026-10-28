import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { api } from "../services/api";
import "../styles/all-done-page.css";

type Session = {
  _id: string;
  props: {
    keyword: string;
  };
};

export function AllDonePage() {
  const { sessionId } = useParams();
  const [session, setSession] = useState<Session>();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    async function loadPrintOrders() {
      try {
        await api.patch(`sessions/${sessionId}/send`);
        const response = await api.get<Session>(`/sessions/${sessionId}`);

        if (!cancelled) {
          setSession(response.data);
        }
      } catch (error: unknown) {
        if (!cancelled) {
          console.error(
            "Não foi possível carregar os pedidos de impressão",
            error,
          );
          setError(true);
        }
      }
    }

    if (sessionId) {
      void loadPrintOrders();
    }

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  return (
    <main className="allDonePage">
      <section className="completion-card">
        <span className="completion-icon" aria-hidden="true" />
        <p className="completion-eyebrow">Sessão finalizada</p>
        <h1>Muito obrigado!</h1>
        <p className="completion-description">
          Seu pedido foi enviado para a impressão.
        </p>
        <div className="keyword-section">
          <p className="keyword-label">Sua palavra-chave</p>
          {error ? (
            <p className="keyword-error">
              Não foi possível carregar sua palavra-chave.
            </p>
          ) : (
            <div className="keyword-container">
              <h2 className="keyword" key={session?._id}>
                {session?.props.keyword}
              </h2>
            </div>
          )}
        </div>
      </section>

      <button className="home-button" onClick={() => navigate("/")}>
        Home
      </button>
    </main>
  );
}
