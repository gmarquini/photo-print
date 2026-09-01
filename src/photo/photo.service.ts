import { Injectable } from '@nestjs/common';
import { Photo } from './entities/Photo';
import { PhotoRepository } from '@/repositories/PhotoRepository';
import { FileStorage } from '@/storage/FileStorage';

@Injectable()
export class PhotoService {
  constructor(
    private readonly photoRepository: PhotoRepository,
    private readonly fileStorage: FileStorage,
  ) {}
  async create(sessionId: string, files: Express.Multer.File[]) {
    const photos: Photo[] = [];

    for (const file of files) {
      const filename = await this.fileStorage.save(file);
      try {
        const photo = new Photo({
          sessionId,
          filename,
          mimetype: file.mimetype,
          size: file.size,
        });
        const createdPhoto = await this.photoRepository.create(photo);
        photos.push(createdPhoto);
      } catch (error) {
        await this.fileStorage.delete(filename); // Se algo falhar, o arquivo é removido.

        throw error;
      }
    }
    return photos;
  }

  async show(sessionId: string): Promise<Photo[]> {
    const photos = await this.photoRepository.findBySessionId(sessionId);

    return photos;
  }

  async remove(sessionId: string, photoId: string) {
    const photo = await this.photoRepository.findByPhotoId(photoId);

    if (!photo) {
      throw new Error('Foto não encontrada');
    }

    await this.fileStorage.delete(photo.filename);
    await this.photoRepository.delete(sessionId, photoId);

    return;
  }
}
