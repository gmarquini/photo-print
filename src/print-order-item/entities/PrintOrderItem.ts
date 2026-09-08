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

export class PrintOrderItem {
  private readonly _id: string;
  private readonly _photoId: string;
  private _size: PhotoSize;
  private _quantity: number;
  private _paperType: PaperType;
  private _photoDate: PhotoDate;

  constructor(
    photoId: string,
    size: PhotoSize,
    quantity: number = 1,
    paperType: PaperType = 'glossy',
    photoDate: PhotoDate = false,
  ) {
    this._id = randomUUID();
    this._photoId = photoId;
    this._size = size;

    if (!Number.isInteger(quantity) || quantity <= 0 || quantity >= 300) {
      throw new AppError('Quantity must be a valid number');
    }

    this._quantity = quantity;
    this._paperType = paperType;
    this._photoDate = photoDate;
  }

  get id() {
    return this._id;
  }
  get photo() {
    return this._photoId;
  }
  get size() {
    return this._size;
  }
  get quantity() {
    return this._quantity;
  }
  get paperType() {
    return this._paperType;
  }
  get photoDate() {
    return this._photoDate;
  }
}
