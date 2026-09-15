import { Module } from '@nestjs/common';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { SessionRepository } from '@/session/domain/session.repository';
import { PrismaSessionRepository } from './repositories/prisma-session.repository';

@Module({
  controllers: [SessionController],
  providers: [
    SessionService,
    {
      provide: SessionRepository,
      useClass: PrismaSessionRepository,
    },
  ],
  exports: [SessionRepository],
})
export class SessionModule {}
