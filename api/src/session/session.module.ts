import { Module } from '@nestjs/common';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { SessionRepository } from '@/session/domain/session.repository';
import { PrismaSessionRepository } from './repositories/prisma-session.repository';
import { PrismaPhotoRepository } from '@/photo/repositories/prisma-photo.repository';
import { PhotoRepository } from '@/photo/domain/photo.repository';
import { FileStorage } from '@/storage/FileStorage';
import { LocalFileStorage } from '@/storage/LocalFileStorage';

@Module({
  controllers: [SessionController],
  providers: [
    SessionService,
    {
      provide: SessionRepository,
      useClass: PrismaSessionRepository,
    },
    {
      provide: PhotoRepository,
      useClass: PrismaPhotoRepository,
    },
    {
      provide: FileStorage,
      useClass: LocalFileStorage,
    },
  ],
  exports: [SessionRepository],
})
export class SessionModule {}
