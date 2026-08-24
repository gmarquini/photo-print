import { Session } from '../entities/Session';

export abstract class SessionRepository {
  abstract create(session: Session): Promise<Session>;
  abstract findById(id: string): Promise<Session | null>;
}
