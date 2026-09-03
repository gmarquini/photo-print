import { Photo } from '@/photo/entities/Photo';
import { PhotoRepository } from './PhotoRepository';
import { AppError } from '@/errors/AppError';

export class InMemoryPhotoRepository implements PhotoRepository {
  private photos: Photo[] = [];

  async create(photo: Photo): Promise<Photo> {
    this.photos.push(photo);

    return Promise.resolve(photo);
  }

  async findBySessionId(sessionId: string): Promise<Photo[]> {
    const photos = this.photos.filter((photo) => photo.sessionId === sessionId);

    return Promise.resolve(photos);
  }

  async findByPhotoId(photoId: string): Promise<Photo | null> {
    const photo = this.photos.find((photo) => photo.id === photoId);

    return photo ?? null;
  }

  async delete(sessionId: string, photoId: string) {
    const photoIndex = this.photos.findIndex(
      (photo) => photo.id === photoId && photo.sessionId === sessionId,
    );

    if (photoIndex === -1) {
      throw new AppError('Foto não encontrada');
    }

    this.photos.splice(photoIndex, 1);
  }

  async deleteMany(sessionId: string) {
    this.photos = this.photos.filter((photo) => photo.sessionId != sessionId);
  }
}
