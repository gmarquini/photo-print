import { Session } from '../domain/session.entity';
import { SessionRepository } from '../domain/session.repository';

export class PrismaSessionRepository implements SessionRepository {
  create(session: Session): Promise<Session> {
    throw new Error('Method not implemented.');
  }
  findById(sessionId: string): Promise<Session | null> {
    throw new Error('Method not implemented.');
  }
  finish(sessionId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
