import { Injectable } from '@nestjs/common';
import { Session } from './domain/session.entity';
import { SessionRepository } from './domain/session.repository';
import { AppError } from '@/errors/AppError';

@Injectable()
export class SessionService {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async create() {
    const session = new Session();

    const newSession = await this.sessionRepository.create(session);

    return newSession;
  }

  async finish(sessionId: string) {
    const session = await this.sessionRepository.finish(sessionId);

    return session;
  }

  async delete(sessionId: string) {
    try {
      await this.sessionRepository.delete(sessionId);
      return;
    } catch {
      throw new AppError('Sessão não encontrada.');
    }
  }
}
