import { randomUUID } from 'crypto';

interface PhotoProps {
  sessionId: string;
  filename: string;
  mimetype: string;
  size: number;
}

export class Photo {
  private readonly _id: string;
  private readonly _sessionId: string;
  private readonly _createdAt: Date;

  private _filename: string;
  private _mimetype: string;
  private _size: number;

  constructor({ sessionId, filename, mimetype, size }: PhotoProps) {
    this._sessionId = sessionId;
    this._id = randomUUID();
    this._createdAt = new Date();
    this._filename = filename;
    this._mimetype = mimetype;
    this._size = size;
  }

  get id() {
    return this._id;
  }
  get filename() {
    return this._filename;
  }
  get mimetype() {
    return this._mimetype;
  }
  get size() {
    return this._size;
  }
  get sessionId() {
    return this._sessionId;
  }
  get createdAt() {
    return this._createdAt;
  }
}
