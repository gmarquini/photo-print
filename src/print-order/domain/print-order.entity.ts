// Armazena o conjunto de itens para o pedido.

import { randomUUID } from 'crypto';

type OrderStatus = 'pending' | 'printing' | 'canceled' | 'done';

export class PrintOrder {
  private readonly _id: string;
  private readonly _printOrderItensId: string[] = [];
  private readonly _status: OrderStatus = 'pending';

  constructor(printOrderItensId: string[]) {
    this._id = randomUUID();
    this._printOrderItensId = printOrderItensId;
  }

  get id() {
    return this._id;
  }
  get printOrderItensId() {
    return this._printOrderItensId;
  }
  get status() {
    return this._status;
  }
}
