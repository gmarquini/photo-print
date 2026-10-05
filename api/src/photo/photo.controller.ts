import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileStorage } from '@/storage/FileStorage';
import { StreamableFile } from '@nestjs/common';

@Controller('sessions')
export class PhotoController {
  constructor(
    private readonly photoService: PhotoService,
    private readonly fileStorage: FileStorage,
  ) {}

  @Post(':sessionId/photos')
  @UseInterceptors(
    FilesInterceptor('photo', 100, {
      limits: {
        fileSize: 10 * 1024 * 1024, //10MB
      },
      fileFilter: (req, file, callback) => {
        const allowedMimeTypes = [
          'image/jpeg',
          'image/jpg',
          'image/png',
          'image/heic',
          'image/webp',
          'image/heif',
          'image/tiff',
        ];
        if (!allowedMimeTypes.includes(file.mimetype)) {
          return callback(
            new BadRequestException('Apenas imagens são permitidas'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async create(
    @Param('sessionId') sessionId: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.photoService.create(sessionId, files);
  }

  @Get(':sessionId/photos/:photoId')
  async getPhoto(
    @Param('sessionId') sessionId: string,
    @Param('photoId') photoId: string,
  ) {
    const photo = await this.photoService.getPhotoById(sessionId, photoId);

    const file = await this.fileStorage.get(photo.filename);

    return new StreamableFile(file, {
      type: photo.mimetype,
    });
  }

  @Get(':sessionId/photos')
  async show(@Param('sessionId') sessionId: string) {
    const photos = await this.photoService.getPhotosBySessionId(sessionId);

    return photos.map((photo) => ({
      id: photo.id,
      filename: photo.filename,
      mimetype: photo.mimetype,
      fileSize: photo.fileSize,
    }));
  }

  @Delete(':sessionId/photos/:photoId')
  remove(@Param('photoId') photoId: string) {
    return this.photoService.remove(photoId);
  }
}
