import { Session } from '@/session/domain/session.entity';
import { SessionRepository } from '@/session/domain/session.repository';

export class InMemorySessionRepository implements SessionRepository {
  index(): Promise<Session[]> {
    throw new Error('Method not implemented.');
  }
  private readonly sessions: Session[] = [];

  async create(session: Session): Promise<Session> {
    this.sessions.push(session);

    return Promise.resolve(session);
  }

  async findById(sessionId: string): Promise<Session | null> {
    console.log('ID recebido:', sessionId);
    console.log('Sessões armazenadas:', this.sessions);
    const session = this.sessions.find((session) => session.id === sessionId);
    return session ?? null;
  }

  async update(session: Session): Promise<Session> {
    const sessionIndex = this.sessions.findIndex(
      (session) => session.id === session.id,
    );

    const updatedSession = (this.sessions[sessionIndex] = session);

    return updatedSession;
  }

  async delete(sessionId: string) {
    const index = this.sessions.findIndex(
      (session) => session.id === sessionId,
    );
    this.sessions.splice(index, 1);
  }
}
