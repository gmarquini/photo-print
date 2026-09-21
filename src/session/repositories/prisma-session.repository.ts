import { PrismaService } from '@/prisma/prisma.service';
import { Session } from '../domain/session.entity';
import { SessionRepository } from '../domain/session.repository';
import { PrismaSessionMapper } from '../mappers/session.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaSessionRepository extends SessionRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }
  async create(session: Session): Promise<Session> {
    const data = await this.prisma.session.create({
      data: {
        id: session.id,
        status: session.status,
        createdAt: session.createdAt,
        finishedAt: session.finishedAt,
      },
    });

    return PrismaSessionMapper.toDomain(data);
  }
  async findById(sessionId: string): Promise<Session | null> {
    const data = await this.prisma.session.findUnique({
      where: {
        id: sessionId,
      },
    });

    if (!data) {
      return null;
    }

    return PrismaSessionMapper.toDomain(data);
  }

  async index(): Promise<Session[]> {
    const sessions = await this.prisma.session.findMany();

    return sessions.map((session) => PrismaSessionMapper.toDomain(session));
  }

  async update(session: Session): Promise<Session> {
    const data = await this.prisma.session.update({
      where: {
        id: session.id,
      },
      data: {
        status: session.status,
        finishedAt: session.finishedAt,
      },
    });

    return PrismaSessionMapper.toDomain(data);
  }

  async delete(sessionId: string): Promise<void> {
    await this.prisma.session.delete({
      where: {
        id: sessionId,
      },
    });
  }
}
