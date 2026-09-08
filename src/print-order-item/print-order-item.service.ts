import { PrintOrderItemRepository } from '@/repositories/PrintOrderItemRepository';
import { Injectable } from '@nestjs/common';
import {
  PaperType,
  PhotoSize,
  PrintOrderItem,
} from './entities/PrintOrderItem';
import { AppError } from '@/errors/AppError';

@Injectable()
export class PrintOrderItemService {
  constructor(
    private readonly printOrderItemRepository: PrintOrderItemRepository,
  ) {}
  async create(
    photoId: string,
    size: PhotoSize,
    quantity: number,
    paperType: PaperType,
    photoDate: boolean,
  ) {
    const printOrderItem = new PrintOrderItem(
      photoId,
      size,
      quantity,
      paperType,
      photoDate,
    );
    const createdPrintOrderItem =
      await this.printOrderItemRepository.create(printOrderItem);

    return createdPrintOrderItem;
  }

  async findById(printOrderItemId: string) {
    const printOrderItem =
      await this.printOrderItemRepository.findById(printOrderItemId);

    if (!printOrderItem) {
      throw new AppError('Item de ordem não encontrado');
    }

    return printOrderItem;
  }

  async delete(itemOrderItemId: string) {
    const itemOrderItem =
      await this.printOrderItemRepository.findById(itemOrderItemId);

    if (!itemOrderItem) {
      throw new AppError('Item de ordem não encontrado');
    }

    await this.printOrderItemRepository.delete(itemOrderItemId);

    return;
  }
}
