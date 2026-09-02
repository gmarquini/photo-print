import { randomUUID } from 'crypto';

export class Session {
  private readonly _id: string;
  private _status: 'active' | 'finished' = 'active';
  private readonly _createdAt: Date;
  private _finishedAt: Date | null = null;

  constructor() {
    this._id = randomUUID();
    this._createdAt = new Date();
  }

  get id() {
    return this._id;
  }

  get status() {
    return this._status;
  }

  get createdAt() {
    return this._createdAt;
  }

  get finishedAt() {
    return this._finishedAt;
  }

  finish() {
    if (this._status === 'finished') {
      this._finishedAt = new Date();
    }
  }
}
