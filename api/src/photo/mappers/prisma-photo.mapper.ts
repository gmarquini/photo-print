import { Photo } from '../domain/photo.entity';

type PrismaPhoto = {
  id: string;
  sessionId: string;
  createdAt: Date;
  filename: string;
  mimetype: string;
  fileSize: number;
};

export class PrismaPhotoMapper {
  static toDomain(data: PrismaPhoto): Photo {
    return new Photo(
      {
        sessionId: data.sessionId,
        createdAt: data.createdAt,
        filename: data.filename,
        mimetype: data.mimetype,
        fileSize: data.fileSize,
      },
      data.id,
    );
  }
}
