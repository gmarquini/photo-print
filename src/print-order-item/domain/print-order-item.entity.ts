// Armazena os dados de uma foto com suas preferências de impressão

import { AppError } from '@/errors/AppError';
import { randomUUID } from 'crypto';

export type PhotoSize =
  | '10x15'
  | '13x18'
  | '15x20'
  | '20x20'
  | '13x35'
  | '50x61'
  | '40x50'
  | '30x38'
  | '28x35';

export type PaperType = 'glossy' | 'matte';
// matte é fosco, glossy é brilhante.

export type PhotoDate = boolean;

export type PrintOrderItemProps = {
  photoId: string;
  size: PhotoSize;
  quantity: number;
  paperType: PaperType;
  showDate: PhotoDate;
  createdAt: Date;
};

export type CreatePrintOrderItemProps = {
  photoId: string;
  size?: PhotoSize;
  quantity?: number;
  paperType?: PaperType;
  showDate?: PhotoDate;
  createdAt?: Date;
};

export class PrintOrderItem {
  private readonly _id: string;
  private props: PrintOrderItemProps;

  constructor(props: CreatePrintOrderItemProps, id?: string) {
    this._id = id ?? randomUUID();
    const quantity = props.quantity ?? 1;

    if (!Number.isInteger(quantity) || quantity <= 0 || quantity > 200) {
      throw new AppError('Quantity must be a valid number');
    }

    this.props = {
      photoId: props.photoId,
      size: props.size ?? '10x15',
      quantity,
      paperType: props.paperType ?? 'glossy',
      showDate: props.showDate ?? false,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  get id() {
    return this._id;
  }
  get size() {
    return this.props.size;
  }
  get photoId() {
    return this.props.photoId;
  }
  get photoSize() {
    return this.props.size;
  }
  get quantity() {
    return this.props.quantity;
  }
  get paperType() {
    return this.props.paperType;
  }
  get showDate() {
    return this.props.showDate;
  }
}
