import { Module } from '@nestjs/common';
import { PrintOrderController } from './print-order.controller';

@Module({
  controllers: [PrintOrderController]
})
export class PrintOrderModule {}
