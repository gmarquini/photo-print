import { randomUUID } from 'crypto';

interface PhotoProps {
  sessionId: string;
  filename: string;
  mimetype: string;
  fileSize: number;
  createdAt?: Date;
}

export class Photo {
  private readonly _id: string;
  private props: PhotoProps;

  constructor(props: PhotoProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      sessionId: props.sessionId,
      createdAt: props.createdAt ?? new Date(),
      filename: props.filename,
      fileSize: props.fileSize,
      mimetype: props.mimetype,
    };
  }

  get id() {
    return this._id;
  }
  get filename() {
    return this.props.filename;
  }
  get mimetype() {
    return this.props.mimetype;
  }
  get fileSize() {
    return this.props.fileSize;
  }
  get sessionId() {
    return this.props.sessionId;
  }
  get createdAt() {
    return this.props.createdAt;
  }
}
