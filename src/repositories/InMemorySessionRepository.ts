import { Session } from '@/session/entities/Session';
import { SessionRepository } from './SessionRepository';

export class InMemorySessionRepository implements SessionRepository {
  private readonly sessions: Session[] = [];

  async create(session: Session): Promise<Session> {
    console.log('sessão recebida:', session);
    this.sessions.push(session);
    console.log('Sessões armazenadas:', this.sessions);

    return Promise.resolve(session);
  }

  async findById(sessionId: string): Promise<Session | null> {
    console.log('ID recebido:', sessionId);
    console.log('Sessões armazenadas:', this.sessions);
    const session = this.sessions.find((session) => session.id === sessionId);
    return session ?? null;
  }

  async finish(sessionId: string) {
    const sessionIndex = this.sessions.findIndex(
      (session) => session.id === sessionId,
    );

    this.sessions[sessionIndex].finish();

    return;
  }
}
