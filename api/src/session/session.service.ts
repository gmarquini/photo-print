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

    try {
      return await this.sessionRepository.create(session);
    } catch {
      throw new AppError('Não foi possível criar uma sessão', 500);
    }
  }

  async index() {
    return this.sessionRepository.index();
  }

  async show(sessionId: string) {
    const session = await this.sessionRepository.findById(sessionId);

    if (!session) {
      throw new AppError('Sessão não encontrada.', 404);
    }

    return session;
  }

  async send(sessionId: string) {
    const session = await this.sessionRepository.findById(sessionId);

    if (!session) {
      throw new AppError('Sessão não encontrada');
    }

    session.send();

    return this.sessionRepository.update(session);
  }

  async cancel(sessionId: string) {
    const session = await this.sessionRepository.findById(sessionId);

    if (!session) {
      throw new AppError('Sessão não encontrada');
    }

    session.cancel();

    return this.sessionRepository.update(session);
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
