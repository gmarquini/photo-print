//Módulo raiz para importar os outros módulos.
import { Module } from '@nestjs/common';
import { SessionModule } from './session/session.module';
import { PhotoModule } from './photo/photo.module';
import { PrintOrderModule } from './print-order/print-order.module';
import { PrintOrderItemModule } from './print-order-item/print-order-item.module';

@Module({
  imports: [SessionModule, PhotoModule, PrintOrderItemModule, PrintOrderModule],
})
export class AppModule {}
