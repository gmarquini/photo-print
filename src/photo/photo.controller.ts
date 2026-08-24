import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('session')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post(':sessionId/photo')
  @UseInterceptors(FileInterceptor('photo'))
  create(
    @Param('sessionId') sessionId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.photoService.create(sessionId, file);
  }
}
