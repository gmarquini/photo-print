import { randomUUID } from 'crypto'; //pronto

type SessionStatus = 'active' | 'finished';

export interface SessionProps {
  status: SessionStatus;
  createdAt: Date;
  finishedAt: Date | null;
}

export class Session {
  private readonly _id: string;
  private props: SessionProps;

  constructor(props?: Partial<SessionProps>, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      status: props?.status ?? 'active',
      createdAt: props?.createdAt ?? new Date(),
      finishedAt: props?.finishedAt ?? null,
    };
  }

  get id() {
    return this._id;
  }

  get status() {
    return this.props.status;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get finishedAt() {
    return this.props.finishedAt;
  }

  finish() {
    if (this.props.status === 'finished') {
      return;
    }

    this.props.status = 'finished';
    this.props.finishedAt = new Date();
  }
}
