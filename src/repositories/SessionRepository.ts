import { Session } from '@/session/entities/Session';

export abstract class SessionRepository {
  abstract create(session: Session): Promise<Session>;
  abstract findById(id: string): Promise<Session | null>;
  abstract delete(sessionId: string): Promise<void>;
}
