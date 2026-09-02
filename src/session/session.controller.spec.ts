import { Test, TestingModule } from '@nestjs/testing';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { SessionRepository } from '@/repositories/SessionRepository';
import { InMemorySessionRepository } from '@/repositories/InMemorySessionRepository';
import { Session } from './entities/Session';
import { beforeEach, describe, expect, it } from 'vitest';

describe('SessionController', () => {
  let controller: SessionController;
  let sessionRepository: InMemorySessionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SessionController],
      providers: [
        SessionService,
        {
          provide: SessionRepository,
          useClass: InMemorySessionRepository,
        },
      ],
    }).compile();

    controller = module.get<SessionController>(SessionController);
    sessionRepository =
      module.get<InMemorySessionRepository>(SessionRepository);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a session', async () => {
    const session = await controller.create();

    expect(session).toBeInstanceOf(Session);
    await expect(sessionRepository.findById(session.id)).resolves.toBe(session);
  });

  it('should delete a session', async () => {
    const session = await controller.create();

    await controller.delete(session.id);

    await expect(sessionRepository.findById(session.id)).resolves.toBeNull();
  });
});
