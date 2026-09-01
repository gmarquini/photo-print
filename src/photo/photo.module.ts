import { Module } from '@nestjs/common';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { PhotoRepository } from '@/repositories/PhotoRepository';
import { InMemoryPhotoRepository } from '@/repositories/InMemoryPhotoRepository';
import { FileStorage } from '@/storage/FileStorage';
import { LocalFileStorage } from '@/storage/LocalFileStorage';

@Module({
  controllers: [PhotoController],
  providers: [
    PhotoService,
    { provide: PhotoRepository, useClass: InMemoryPhotoRepository },
    { provide: FileStorage, useClass: LocalFileStorage },
  ],
})
export class PhotoModule {}
