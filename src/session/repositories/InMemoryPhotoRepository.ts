import { Photo } from '@/photo/entities/Photo';
import { PhotoRepository } from './PhotoRepository';

export class InMemoryPhotoRepository implements PhotoRepository {
  private readonly photos: Photo[] = [];

  async create(photo: Photo): Promise<Photo> {
    this.photos.push(photo);
    console.log(this.photos);

    return Promise.resolve(photo);
  }

  async findBySessionId(sessionId: string): Promise<Photo | null> {
    const photo = this.photos.find((photo) => photo.sessionId === sessionId);

    if (!photo) {
      return null;
    }

    return Promise.resolve(photo);
  }

  async findById(id: string): Promise<Photo | null> {
    const photo = this.photos.find((photo) => photo.id === id);

    return photo ?? null;
  }
}
