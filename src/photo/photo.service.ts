import { Injectable } from '@nestjs/common';
import { Photo } from './entities/Photo';

@Injectable()
export class PhotoService {
  create(sessionId: string, file: Express.Multer.File) {
    const photo = new Photo({
      sessionId,
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size,
    });

    return photo;
  }
}
