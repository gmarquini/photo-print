import { Injectable } from '@nestjs/common';
import { Session } from './domain/session.entity';
import { SessionRepository } from './domain/session.repository';
import { AppError } from '@/errors/AppError';
import { PhotoRepository } from '@/photo/domain/photo.repository';
import { FileStorage } from '@/storage/FileStorage';

@Injectable()
export class SessionService {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly photoRepository: PhotoRepository,
    private readonly fileStorage: FileStorage,
  ) {}

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

  async send(sessionId: string) {
    const session = await this.sessionRepository.findById(sessionId);

    if (!session) {
      throw new AppError('Sessão não encontrada');
    }

    session.send();

    const sentSession = await this.sessionRepository.update(session);

    return sentSession;
  }

  async cancel(sessionId: string) {
    const session = await this.sessionRepository.findById(sessionId);

    if (!session) {
      throw new AppError('Sessão não encontrada');
    }

    session.cancel();

    const canceledSession = await this.sessionRepository.update(session);

    return canceledSession;
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
    const photos = await this.photoRepository.findBySessionId(sessionId);

    for (const photo of photos) {
      await this.fileStorage.delete(photo.filename);
    }

    await this.sessionRepository.delete(sessionId);
  }
}
