// Armazena os dados de cada item com suas preferências de impressão

import { randomUUID } from 'crypto';

type PhotoSize =
  | '10x15'
  | '13x18'
  | '15x20'
  | '20x20'
  | '13x35'
  | '50x61'
  | '40x50'
  | '30x38'
  | '28x35';

type PaperType = 'matte' | 'glossy';
// matte é fosco, glossy é brilhante.

export class PrintOrderItem {
  private readonly _id: string;
  private readonly _photoId: string;
  private readonly _size: PhotoSize;
  private readonly _quantity: number;
  private readonly _paperType: PaperType;

  constructor(
    photoId: string,
    size: PhotoSize,
    quantity: number = 1,
    paperType: PaperType,
  ) {
    this._id = randomUUID();
    this._photoId = photoId;
    this._size = size;

    if (!Number.isInteger(quantity) || quantity <= 0 || quantity >= 300) {
      throw new Error('Quantity must be a valid number');
    }

    this._quantity = quantity;
    this._paperType = paperType;
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
}
