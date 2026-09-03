import { Session } from '@/session/entities/Session';

export abstract class SessionRepository {
  abstract create(session: Session): Promise<Session>;
  abstract findById(sessionId: string): Promise<Session | null>;
  abstract finish(sessionId: string): Promise<void>;
}
