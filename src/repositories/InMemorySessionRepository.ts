import { Session } from '@/session/entities/Session';
import { SessionRepository } from './SessionRepository';

export class InMemorySessionRepository implements SessionRepository {
  private readonly sessions: Session[] = [];

  async create(session: Session): Promise<Session> {
    this.sessions.push(session);

    return Promise.resolve(session);
  }

  async findById(id: string): Promise<Session | null> {
    const session = this.sessions.find((session) => session.id === id);

    return session ?? null;
  }

  async finish(sessionId: string) {
    const sessionIndex = this.sessions.findIndex(
      (session) => session.id === sessionId,
    );

    this.sessions[sessionIndex].status = 'finished';

    return;
  }
}
