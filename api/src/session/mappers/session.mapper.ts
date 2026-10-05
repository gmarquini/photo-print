import { Status } from '@prisma/client';
import { Session } from '../domain/session.entity';

type PrismaSession = {
  status: Status;
  createdAt: Date;
  finishedAt: Date | null;
  id: string;
};

export class PrismaSessionMapper {
  static toDomain(data: PrismaSession): Session {
    return new Session(
      {
        status: data.status,
        createdAt: data.createdAt,
        finishedAt: data.finishedAt,
      },
      data.id,
    );
  }
}
