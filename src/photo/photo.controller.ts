import {
  Controller,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('session')
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
}
