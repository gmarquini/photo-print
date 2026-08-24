import { randomUUID } from 'crypto';

export class Session {
  private readonly _id: string;
  private readonly _createdAt: Date;

  constructor() {
    this._id = randomUUID();
    this._createdAt = new Date();
  }

  get id() {
    return this._id;
  }

  get createdAt() {
    return this._createdAt;
  }
}
