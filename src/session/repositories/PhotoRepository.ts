import { Photo } from '@/photo/entities/Photo';

export abstract class PhotoRepository {
  abstract create(photo: Photo): Promise<Photo>;
  abstract findBySessionId(sessionId: string): Promise<Photo | null>;
  abstract findById(id: string): Promise<Photo | null>;
}
