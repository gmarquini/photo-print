import { AppError } from '@/errors/AppError';
import {
  PaperType,
  PhotoDate,
  PrintOrderItem,
} from '../domain/print-order-item.entity';

type PrismaPrintOrderItemProps = {
  id: string;
  photoId: string;
  size: string;
  quantity: number;
  paperType: PaperType;
  showDate: PhotoDate;
  createdAt: Date;
};

export class PrismaPrintOrderMapper {
  static toDomain(data: PrismaPrintOrderItemProps): PrintOrderItem {
    return new PrintOrderItem(
      {
        photoId: data.photoId,
        size: toPhotoSize(data.size),
        quantity: data.quantity,
        paperType: data.paperType,
        showDate: data.showDate,
        createdAt: data.createdAt,
      },
      data.id,
    );
  }
}

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
