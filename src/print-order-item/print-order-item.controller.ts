import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PrintOrderItemService } from './print-order-item.service';
import type { PhotoSize, PaperType } from './domain/print-order-item.entity';

@Controller('sessions')
export class PrintOrderItemController {
  constructor(private readonly printOrderItemService: PrintOrderItemService) {}

  @Post('photos/:photoId/print')
  async create(
    @Param('photoId') photoId: string,
    @Body('quantity') quantity?: number,
    @Body('paperType') paperType?: PaperType,
    @Body('size') size?: PhotoSize,
  ) {
    const printOrderItem = await this.printOrderItemService.create({
      photoId,
      quantity,
      paperType,
      size,
    });
    return printOrderItem;
  }

  @Get(':sessionId/print')
  async index(@Param('sessionId') sessionId: string) {
    return await this.printOrderItemService.index(sessionId);
  }
}
