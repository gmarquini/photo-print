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

@Controller('sessions')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post(':sessionId/photos')
  @UseInterceptors(
    FilesInterceptor('photo', 100, {
      limits: {
        fileSize: 10 * 1024 * 1024, //10MB
      },
      fileFilter: (req, file, callback) => {
        const allowedMimeTypes = [
          'image/jpeg',
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
    return this.photoService.getPhotoById(sessionId, photoId);
  }

  @Get(':sessionId/photos')
  async show(@Param('sessionId') sessionId: string) {
    return this.photoService.getPhotosBySessionId(sessionId);
  }

  @Delete(':sessionId/photos/:photoId')
  remove(
    @Param('sessionId') sessionId: string,
    @Param('photoId') photoId: string,
  ) {
    return this.photoService.remove(sessionId, photoId);
  }
}
