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

  async index() {
    const sessions = await this.sessionRepository.index();

    return sessions;
  }

  async show(sessionId: string) {
    const session = await this.sessionRepository.findById(sessionId);

    if (!session) {
      throw new AppError('Sessão não encontrada.');
    }

    return session;
  }

  async finish(sessionId: string) {
    const session = await this.sessionRepository.findById(sessionId);

    if (!session) {
      throw new AppError('Sessão não encontrada');
    }

    session.finish();

    const finishedSession = await this.sessionRepository.update(session);

    if (!finishedSession) {
      throw new AppError('Não foi possível finalizar a sessão');
    }

    return finishedSession;
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
