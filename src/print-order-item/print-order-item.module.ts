import { PrismaSessionRepository } from './../session/repositories/prisma-session.repository';
import { Module } from '@nestjs/common';
import { PrintOrderItemService } from './print-order-item.service';
import { PrintOrderItemController } from './print-order-item.controller';
import { PrintOrderItemRepository } from './domain/print-order-item.repository';
import { PrismaPrintOrderItemRepository } from './repositories/prisma-print-order-item-repository';
import { PhotoRepository } from '@/photo/domain/photo.repository';
import { PrismaPhotoRepository } from '@/photo/repositories/prisma-photo.repository';
import { SessionRepository } from '@/session/domain/session.repository';

@Module({
  controllers: [PrintOrderItemController],
  providers: [
    PrintOrderItemService,
    {
      provide: PrintOrderItemRepository,
      useClass: PrismaPrintOrderItemRepository,
    },
    {
      provide: PhotoRepository,
      useClass: PrismaPhotoRepository,
    },
    {
      provide: SessionRepository,
      useClass: PrismaSessionRepository,
    },
  ],
})
export class PrintOrderItemModule {}
