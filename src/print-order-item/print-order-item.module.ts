import { Module } from '@nestjs/common';
import { PrintOrderItemService } from './print-order-item.service';
import { PrintOrderItemController } from './print-order-item.controller';
import { PrintOrderItemRepository } from './domain/print-order-item.repository';
import { PrismaPrintOrderItemRepository } from './repositories/prisma-print-orderItem-repository';

@Module({
  controllers: [PrintOrderItemController],
  providers: [
    PrintOrderItemService,
    {
      provide: PrintOrderItemRepository,
      useClass: PrismaPrintOrderItemRepository,
    },
  ],
})
export class PrintOrderItemModule {}
