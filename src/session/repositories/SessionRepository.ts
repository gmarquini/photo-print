import { Session } from '../entities/Session';

export interface SessionRepository {
  findById(id: string): Promise<Session | null>;
}
