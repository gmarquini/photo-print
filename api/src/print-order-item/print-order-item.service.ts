import { PrintOrderItemRepository } from '@/print-order-item/domain/print-order-item.repository';
import { Injectable } from '@nestjs/common';
import {
  CreatePrintOrderItemProps,
  PrintOrderItem,
} from '@/print-order-item/domain/print-order-item.entity';
import { AppError } from '@/errors/AppError';
import { PhotoRepository } from '@/photo/domain/photo.repository';
import { SessionRepository } from '@/session/domain/session.repository';

@Injectable()
export class PrintOrderItemService {
  constructor(
    private readonly printOrderItemRepository: PrintOrderItemRepository,
    private readonly photoRepository: PhotoRepository,
    private readonly sessionRepository: SessionRepository,
  ) {}
  async create(props: CreatePrintOrderItemProps) {
    const photo = await this.photoRepository.findByPhotoId(props.photoId);

    if (!photo) {
      throw new AppError('Foto não encontrada');
    }

    if (props.size) {
      toPhotoSize(props.size);
    }

    const printOrderItem = new PrintOrderItem({
      photoId: props.photoId,
      size: props.size,
      quantity: props.quantity,
      paperType: props.paperType,
      showDate: props.showDate,
    });

    return await this.printOrderItemRepository.create(printOrderItem);

    function toPhotoSize(size: string) {
      if (
        size === '10x15' ||
        size === '13x18' ||
        size === '15x20' ||
        size === '20x20' ||
        size === '13x35' ||
        size === '50x61' ||
        size === '40x50' ||
        size === '30x38' ||
        size === '28x35'
      ) {
        return size;
      }

      throw new AppError(`Invalid photo size: ${size}`);
    }
  }

  async update() {
    throw new AppError('Method not implemented yet'); // TODO:
  }

  async show(printOrderItemId: string) {
    const printOrderItem =
      await this.printOrderItemRepository.findById(printOrderItemId);

    if (!printOrderItem) {
      throw new AppError('Item de ordem não encontrado');
    }

    return printOrderItem;
  }

  async index(sessionId: string) {
    const session = await this.sessionRepository.findById(sessionId);

    if (!session) {
      throw new AppError('Sessão não encontrada');
    }

    return await this.printOrderItemRepository.findBySessionId(sessionId);
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
