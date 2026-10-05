import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { FileStorage } from '@/storage/FileStorage';
import { PhotoController } from './photo.controller';
import { SessionModule } from '@/session/session.module';
import { LocalFileStorage } from '@/storage/LocalFileStorage';
import { PhotoRepository } from '@/photo/domain/photo.repository';
import { PrismaPhotoRepository } from './repositories/prisma-photo.repository';

@Module({
  imports: [SessionModule],
  controllers: [PhotoController],
  providers: [
    PhotoService,
    { provide: PhotoRepository, useClass: PrismaPhotoRepository },
    { provide: FileStorage, useClass: LocalFileStorage },
  ],
})
export class PhotoModule {}
