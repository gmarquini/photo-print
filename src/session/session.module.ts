import { Module } from '@nestjs/common';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { SessionRepository } from '@/repositories/SessionRepository';
import { InMemorySessionRepository } from '@/repositories/InMemorySessionRepository';

@Module({
  controllers: [SessionController],
  providers: [
    SessionService,
    {
      provide: SessionRepository,
      useClass: InMemorySessionRepository,
    },
  ],
  exports: [SessionRepository],
})
export class SessionModule {}
