import { Module } from '@nestjs/common';
import { PrintOrderItemController } from './print-order-item.controller';
import { PrintOrderItemService } from './print-order-item.service';

@Module({
  controllers: [PrintOrderItemController],
  providers: [PrintOrderItemService]
})
export class PrintOrderItemModule {}
