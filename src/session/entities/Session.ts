import { Photo } from './../../photo/entities/Photo';
import { randomUUID } from 'crypto';

export class Session {
  private readonly _id: string;
  private readonly _createdAt: Date;
  private readonly _photos: Photo[] = []; //inicia com a array vazia.

  constructor() {
    this._id = randomUUID();
    this._createdAt = new Date();
  }

  get photos() {
    return this._photos;
  }

  get id() {
    return this._id;
  }

  get createdAt() {
    return this._createdAt;
  }
}
