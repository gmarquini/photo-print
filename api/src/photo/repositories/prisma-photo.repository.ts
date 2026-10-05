import { PrismaService } from '@/prisma/prisma.service';
import { Photo } from '../domain/photo.entity';
import { PhotoRepository } from '../domain/photo.repository';
import { PrismaPhotoMapper } from '../mappers/prisma-photo.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaPhotoRepository extends PhotoRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(photo: Photo): Promise<Photo> {
    const data = await this.prisma.photo.create({
      data: {
        id: photo.id,
        sessionId: photo.sessionId,
        createdAt: photo.createdAt,
        filename: photo.filename,
        mimetype: photo.mimetype,
        fileSize: photo.fileSize,
      },
    });

    return PrismaPhotoMapper.toDomain(data);
  }

  async findBySessionId(sessionId: string): Promise<Photo[]> {
    const photos = await this.prisma.photo.findMany({
      where: {
        sessionId: sessionId,
      },
    });

    return photos.map((photo) => PrismaPhotoMapper.toDomain(photo));
  }

  async findByPhotoId(photoId: string): Promise<Photo | null> {
    const photo = await this.prisma.photo.findUnique({
      where: {
        id: photoId,
      },
    });

    if (!photo) {
      return null;
    }

    return PrismaPhotoMapper.toDomain(photo);
  }

  async delete(photoId: string): Promise<void> {
    await this.prisma.photo.delete({
      where: {
        id: photoId,
      },
    });
    return;
  }

  async deleteMany(sessionId: string): Promise<void> {
    await this.prisma.photo.deleteMany({
      where: {
        sessionId: sessionId,
      },
    });
    return;
  }
}
