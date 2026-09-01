import {
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
  @UseInterceptors(FilesInterceptor('photos'))
  create(
    @Param('sessionId') sessionId: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.photoService.create(sessionId, files);
  }

  @Get(':sessionId/photos')
  show(@Param('sessionId') sessionId: string) {
    return this.photoService.show(sessionId);
  }

  @Delete(':sessionId/photos/:photoId')
  remove(
    @Param('sessionId') sessionId: string,
    @Param('photoId') photoId: string,
  ) {
    return this.photoService.remove(sessionId, photoId);
  }
}
