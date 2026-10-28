import { AppError } from '@/errors/AppError';
import { Photo } from '@/photo/domain/photo.entity';
import { PhotoRepository } from '@/photo/domain/photo.repository';
import { Session } from '@/session/domain/session.entity';
import { SessionRepository } from '@/session/domain/session.repository';
import { FileStorage } from '@/storage/FileStorage';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { SessionService } from './session.service';

describe('SessionService', () => {
  let service: SessionService;
  let sessionRepository: jest.Mocked<SessionRepository>;
  let photoRepository: jest.Mocked<PhotoRepository>;
  let fileStorage: jest.Mocked<FileStorage>;

  beforeEach(() => {
    sessionRepository = {
      create: jest.fn<SessionRepository['create']>(),
      findById: jest.fn<SessionRepository['findById']>(),
      index: jest.fn<SessionRepository['index']>(),
      update: jest.fn<SessionRepository['update']>(),
      delete: jest.fn<SessionRepository['delete']>(),
    };
    photoRepository = {
      create: jest.fn<PhotoRepository['create']>(),
      findBySessionId: jest.fn<PhotoRepository['findBySessionId']>(),
      findByPhotoId: jest.fn<PhotoRepository['findByPhotoId']>(),
      delete: jest.fn<PhotoRepository['delete']>(),
      deleteMany: jest.fn<PhotoRepository['deleteMany']>(),
    };
    fileStorage = {
      save: jest.fn<FileStorage['save']>(),
      delete: jest.fn<FileStorage['delete']>(),
      get: jest.fn<FileStorage['get']>(),
    };

    service = new SessionService(
      sessionRepository,
      photoRepository,
      fileStorage,
    );
  });

  describe('create', () => {
    it('creates and returns a session', async () => {
      sessionRepository.create.mockImplementation(async (session) => session);

      const result = await service.create();

      expect(sessionRepository.create.mock.calls).toHaveLength(1);
      expect(sessionRepository.create.mock.calls[0][0]).toBeInstanceOf(Session);
      expect(result).toBe(sessionRepository.create.mock.calls[0][0]);
    });

    it('throws an AppError when session creation fails', async () => {
      sessionRepository.create.mockRejectedValue(new Error('database failure'));

      await expect(service.create()).rejects.toMatchObject({
        message: 'Não foi possível criar uma sessão',
        statusCode: 500,
      });
    });
  });

  it('returns all sessions', async () => {
    const sessions = [new Session()];
    sessionRepository.index.mockResolvedValue(sessions);

    await expect(service.index()).resolves.toBe(sessions);
    expect(sessionRepository.index.mock.calls).toHaveLength(1);
  });

  describe('show', () => {
    it('returns the requested session', async () => {
      const session = new Session();
      sessionRepository.findById.mockResolvedValue(session);

      await expect(service.show(session.id)).resolves.toBe(session);
      expect(sessionRepository.findById.mock.calls).toEqual([[session.id]]);
    });

    it('throws a not-found AppError when the session does not exist', async () => {
      sessionRepository.findById.mockResolvedValue(null);

      await expect(service.show('missing-session')).rejects.toMatchObject({
        message: 'Sessão não encontrada.',
        statusCode: 404,
      });
    });
  });

  describe.each([
    ['send', 'sent'],
    ['cancel', 'canceled'],
    ['finish', 'finished'],
  ] as const)('%s', (action, expectedStatus) => {
    it(`updates the session to ${expectedStatus}`, async () => {
      const session = new Session();
      sessionRepository.findById.mockResolvedValue(session);
      sessionRepository.update.mockImplementation(
        async (updatedSession) => updatedSession,
      );

      const result = await service[action](session.id);

      expect(result).toBe(session);
      expect(sessionRepository.update.mock.calls).toEqual([[session]]);
      expect(session.status).toBe(expectedStatus);
      expect(session.finishedAt).toBeInstanceOf(Date);
    });

    it('throws an AppError when the session does not exist', async () => {
      sessionRepository.findById.mockResolvedValue(null);

      await expect(service[action]('missing-session')).rejects.toBeInstanceOf(
        AppError,
      );
      expect(sessionRepository.update.mock.calls).toHaveLength(0);
    });
  });

  it('throws an AppError when finishing does not update the session', async () => {
    const session = new Session();
    sessionRepository.findById.mockResolvedValue(session);
    sessionRepository.update.mockImplementation(async () => null as never);

    await expect(service.finish(session.id)).rejects.toMatchObject({
      message: 'Não foi possível finalizar a sessão',
    });
  });

  describe('delete', () => {
    it('deletes each photo file before deleting the session', async () => {
      const photos = [
        new Photo({
          sessionId: 'session-id',
          filename: 'first.jpg',
          mimetype: 'image/jpeg',
          fileSize: 1,
        }),
        new Photo({
          sessionId: 'session-id',
          filename: 'second.jpg',
          mimetype: 'image/jpeg',
          fileSize: 1,
        }),
      ];
      const operations: string[] = [];
      photoRepository.findBySessionId.mockResolvedValue(photos);
      fileStorage.delete.mockImplementation(async (filename) => {
        operations.push(`file:${filename}`);
      });
      sessionRepository.delete.mockImplementation(async (sessionId) => {
        operations.push(`session:${sessionId}`);
      });

      await service.delete('session-id');

      expect(fileStorage.delete.mock.calls).toEqual([
        ['first.jpg'],
        ['second.jpg'],
      ]);
      expect(sessionRepository.delete.mock.calls).toEqual([['session-id']]);
      expect(operations).toEqual([
        'file:first.jpg',
        'file:second.jpg',
        'session:session-id',
      ]);
    });

    it('deletes a session with no photos', async () => {
      photoRepository.findBySessionId.mockResolvedValue([]);

      await service.delete('session-id');

      expect(fileStorage.delete.mock.calls).toHaveLength(0);
      expect(sessionRepository.delete.mock.calls).toEqual([['session-id']]);
    });

    it('does not delete the session if deleting a photo file fails', async () => {
      photoRepository.findBySessionId.mockResolvedValue([
        new Photo({
          sessionId: 'session-id',
          filename: 'photo.jpg',
          mimetype: 'image/jpeg',
          fileSize: 1,
        }),
      ]);
      fileStorage.delete.mockRejectedValue(new Error('storage failure'));

      await expect(service.delete('session-id')).rejects.toThrow(
        'storage failure',
      );
      expect(sessionRepository.delete.mock.calls).toHaveLength(0);
    });
  });
});
