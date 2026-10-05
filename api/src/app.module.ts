//Módulo raiz para importar os outros módulos.
import { Module } from '@nestjs/common';
import { SessionModule } from './session/session.module';
import { PhotoModule } from './photo/photo.module';
import { PrintOrderItemModule } from './print-order-item/print-order-item.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [SessionModule, PhotoModule, PrintOrderItemModule, PrismaModule],
})
export class AppModule {}
