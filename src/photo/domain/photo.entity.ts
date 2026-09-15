import { randomUUID } from 'crypto';

interface PhotoProps {
  sessionId: string;
  filename: string;
  mimetype: string;
  fileSize: number;
}

export class Photo {
  private readonly _id: string;
  private readonly _sessionId: string;
  private readonly _createdAt: Date;

  private _filename: string;
  private _mimetype: string;
  private _fileSize: number;

  constructor({ sessionId, filename, mimetype, fileSize }: PhotoProps) {
    this._sessionId = sessionId;
    this._id = randomUUID();
    this._createdAt = new Date();
    this._filename = filename;
    this._mimetype = mimetype;
    this._fileSize = fileSize;
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
  get fileSize() {
    return this._fileSize;
  }
  get sessionId() {
    return this._sessionId;
  }
  get createdAt() {
    return this._createdAt;
  }
}
