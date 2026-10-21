import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PrintOrderItemService } from './print-order-item.service';
import { z, ZodError } from 'zod';

const createPrintOrderItemSchema = z.object({
  quantity: z.number().int().max(200).optional(),
  paperType: z.enum(['glossy', 'matte']).optional(),
  size: z
    .enum([
      '10x15',
      '13x18',
      '15x20',
      '20x20',
      '13x35',
      '50x61',
      '40x50',
      '30x38',
      '28x35',
    ])
    .optional(),
  showDate: z.boolean().optional(),
});

@Controller('sessions')
export class PrintOrderItemController {
  constructor(private readonly printOrderItemService: PrintOrderItemService) {}

  @Post('photos/:photoId/printOrders')
  async create(@Param('photoId') photoId: string, @Body() body?: unknown) {
    try {
      const data = createPrintOrderItemSchema.parse(body);

      return this.printOrderItemService.create({
        photoId,
        size: data.size,
        quantity: data.quantity,
        paperType: data.paperType,
        showDate: data.showDate,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(error.issues);
      }

      throw error;
    }
  }

  @Put()
  async update() {} // TODO:

  @Get('printOrders/:printOrderItemId')
  async show(@Param('printOrderItemId') printOrderItemId: string) {
    return await this.printOrderItemService.show(printOrderItemId);
  }

  @Get(':sessionId/printOrders')
  async index(@Param('sessionId') sessionId: string) {
    return await this.printOrderItemService.index(sessionId);
  }

  @Delete('printOrders/:printOrderItemId')
  async delete(@Param('printOrderItemId') printOrderItemId: string) {
    return await this.printOrderItemService.delete(printOrderItemId);
  }
}
