import { Session } from '@/session/domain/session.entity';

export abstract class SessionRepository {
  abstract create(session: Session): Promise<Session>;
  abstract findById(sessionId: string): Promise<Session | null>;
  abstract finish(sessionId: string): Promise<void>;
}
