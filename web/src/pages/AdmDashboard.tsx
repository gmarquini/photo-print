import { useEffect, useState } from "react";
import { api } from "../services/api";
import "../styles/adm-dashboard.css";
import { useNavigate } from "react-router";
import { formatDate } from "../utils/formatDate";

type Session = {
  _id: string;
  props: {
    status: string;
    keyword: string;
    createdAt: string;
    finishedAt: string;
  };
};

export function AdmDashboard() {
  const [sessions, setSessions] = useState<Session[] | null>(null);
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    async function getSessions() {
      try {
        const response = await api.get<Session[]>("/sessions");
        if (isMounted) {
          setSessions(response.data);
        }
      } catch (error: unknown) {
        console.error("Não foi possível carregar as sessões", error);
        if (isMounted) {
          setHasError(true);
        }
      }
    }

    void getSessions();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="admDashboard">
      <section className="admDashboard-card">
        <header className="admDashboard-header">
          <span className="admDashboard-icon" aria-hidden="true" />
          <p className="admDashboard-eyebrow">Painel administrativo</p>
          <h1>Sessões</h1>
          <p className="admDashboard-description">
            Acompanhe as sessões e seus status.
          </p>
        </header>

        <section className="admDashboard-list" aria-label="Lista de sessões">
          {hasError ? (
            <p className="admDashboard-message" role="alert">
              Não foi possível carregar as sessões.
            </p>
          ) : sessions === null ? (
            <p className="admDashboard-message" role="status">
              Carregando sessões...
            </p>
          ) : sessions.length === 0 ? (
            <p className="admDashboard-message">Não há sessões para mostrar.</p>
          ) : (
            sessions.sort().map((session) => (
              <article className="session-element" key={session._id}>
                <h2 className="session-keyword">
                  <p>{"Palavra chave: "}</p>
                  {session.props.keyword}
                </h2>
                <span className="session-status">
                  {formatDate(session.props.createdAt).date}
                  {" - "}
                  {formatDate(session.props.createdAt).hour}
                </span>
              </article>
            ))
          )}
        </section>
      </section>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Sair
      </button>
    </main>
  );
}
