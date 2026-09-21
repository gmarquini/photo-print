import { Session } from '@/session/domain/session.entity';

export abstract class SessionRepository {
  abstract create(session: Session): Promise<Session>;
  abstract findById(sessionId: string): Promise<Session | null>;
  abstract index(): Promise<Session[]>;
  abstract update(session: Session): Promise<Session>;
  abstract delete(sessionId: string): Promise<void>;
}
