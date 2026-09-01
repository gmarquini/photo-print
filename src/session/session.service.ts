import { Injectable } from '@nestjs/common';
import { Session } from './entities/Session';
import { SessionRepository } from '@/repositories/SessionRepository';

@Injectable()
export class SessionService {
  constructor(private readonly sessionRepository: SessionRepository) {}
  async create() {
    const session = new Session();

    const newSession = await this.sessionRepository.create(session);

    return newSession;
  }
}
