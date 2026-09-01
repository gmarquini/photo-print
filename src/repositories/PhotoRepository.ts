import { Photo } from '@/photo/entities/Photo';

export abstract class PhotoRepository {
  abstract create(photo: Photo): Promise<Photo>;
  abstract findBySessionId(sessionId: string): Promise<Photo[]>;
  abstract findByPhotoId(photoId: string): Promise<Photo | null>;
  abstract delete(sessionid: string, photoId: string): Promise<void>;
}
