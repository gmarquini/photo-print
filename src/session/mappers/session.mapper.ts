import { Session, SessionProps } from '../domain/session.entity';

export class PrismaSessionMapper {
  static toDomain(data: SessionProps): Session {
    return new Session({
      id: data.id,
      status: data.status,
      createdAt: data.createdAt,
      finishedAt: data.finishedAt,
    });
  }
}
