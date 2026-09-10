/// <reference types="jest" />
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { Photo } from './entities/Photo';
import { Session } from '@/session/entities/Session';
import { PhotoRepository } from '@/repositories/PhotoRepository';
import { SessionRepository } from '@/repositories/SessionRepository';
import { FileStorage } from '@/storage/FileStorage';
import { InMemoryPhotoRepository } from '@/repositories/inMemoryRepositories/InMemoryPhotoRepository';
import { InMemorySessionRepository } from '@/repositories/inMemoryRepositories/InMemorySessionRepository';

describe('PhotoController', () => {
  let controller: PhotoController;
  let photoRepository: InMemoryPhotoRepository;
  let sessionRepository: InMemorySessionRepository;
  let fileStorage: any;

  const mockFilename = 'test-file.jpg';

  beforeEach(async () => {
    // Create in-memory repository implementations
    photoRepository = new InMemoryPhotoRepository();
    sessionRepository = new InMemorySessionRepository();

    // Create mock for FileStorage
    fileStorage = {
      save: jest.fn(),
      delete: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhotoController],
      providers: [
        PhotoService,
        { provide: PhotoRepository, useValue: photoRepository },
        { provide: SessionRepository, useValue: sessionRepository },
        { provide: FileStorage, useValue: fileStorage },
      ],
    }).compile();

    controller = module.get<PhotoController>(PhotoController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create photos successfully', async () => {
      const mockSession = new Session();
      const sessionId = mockSession.id;

      const mockFile: Express.Multer.File = {
        fieldname: 'photo',
        originalname: 'test.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        size: 1024,
        destination: './uploads',
        filename: mockFilename,
        path: './uploads/test.jpg',
        buffer: Buffer.from('test'),
        stream: null,
      } as any;

      // Create session in repository
      await sessionRepository.create(mockSession);

      // Mock file storage
      fileStorage.save.mockResolvedValue(mockFilename);

      const result = await controller.create(sessionId, [mockFile]);

      expect(fileStorage.save).toHaveBeenCalledWith(mockFile);
      expect(result).toHaveLength(1);
      expect(result[0].filename).toBe(mockFilename);
    });

    it('should handle multiple file uploads', async () => {
      const mockSession = new Session();
      const sessionId = mockSession.id;

      const mockFiles: Express.Multer.File[] = [
        {
          fieldname: 'photo',
          originalname: 'test1.jpg',
          encoding: '7bit',
          mimetype: 'image/jpeg',
          size: 1024,
          destination: './uploads',
          filename: 'file1.jpg',
          path: './uploads/test1.jpg',
          buffer: Buffer.from('test'),
          stream: null,
        } as any,
        {
          fieldname: 'photo',
          originalname: 'test2.png',
          encoding: '7bit',
          mimetype: 'image/png',
          size: 2048,
          destination: './uploads',
          filename: 'file2.png',
          path: './uploads/test2.png',
          buffer: Buffer.from('test'),
          stream: null,
        } as any,
      ];

      // Create session in repository
      await sessionRepository.create(mockSession);

      // Mock file storage
      fileStorage.save
        .mockResolvedValueOnce('file1.jpg')
        .mockResolvedValueOnce('file2.png');

      const result = await controller.create(sessionId, mockFiles);

      expect(result).toHaveLength(2);
      expect(fileStorage.save).toHaveBeenCalledTimes(2);
    });

    it('should throw error when session does not exist', async () => {
      const mockFile: Express.Multer.File = {
        fieldname: 'photo',
        originalname: 'test.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        size: 1024,
        destination: './uploads',
        filename: mockFilename,
        path: './uploads/test.jpg',
        buffer: Buffer.from('test'),
        stream: null,
      } as any;

      const invalidSessionId = 'non-existent-session';

      await expect(
        controller.create(invalidSessionId, [mockFile]),
      ).rejects.toThrow('Sessão não encontrada.');
    });

    it('should handle empty file array', async () => {
      const mockSession = new Session();
      const sessionId = mockSession.id;

      await sessionRepository.create(mockSession);

      const result = await controller.create(sessionId, []);

      expect(result).toEqual([]);
    });
  });

  describe('getPhoto', () => {
    it('should return a photo by id', async () => {
      const mockSession = new Session();
      const sessionId = mockSession.id;

      const mockPhoto = new Photo({
        sessionId: sessionId,
        filename: mockFilename,
        mimetype: 'image/jpeg',
        size: 1024,
      });

      // Create session and photo in repository
      await sessionRepository.create(mockSession);
      await photoRepository.create(mockPhoto);

      const result = await controller.getPhoto(sessionId, mockPhoto.id);

      expect(result).toEqual(mockPhoto);
      expect(result.filename).toBe(mockFilename);
    });

    it('should throw error when session not found', async () => {
      const invalidSessionId = 'non-existent-session';
      const invalidPhotoId = 'non-existent-photo';

      await expect(
        controller.getPhoto(invalidSessionId, invalidPhotoId),
      ).rejects.toThrow('Sessão não encontrada');
    });

    it('should throw error when photo not found', async () => {
      const mockSession = new Session();
      const sessionId = mockSession.id;

      await sessionRepository.create(mockSession);

      const invalidPhotoId = 'non-existent-photo';

      await expect(
        controller.getPhoto(sessionId, invalidPhotoId),
      ).rejects.toThrow('Foto não encontrada');
    });
  });

  describe('show', () => {
    it('should return all photos for a session', async () => {
      const mockSession = new Session();
      const sessionId = mockSession.id;

      const mockPhotos = [
        new Photo({
          sessionId: sessionId,
          filename: 'photo1.jpg',
          mimetype: 'image/jpeg',
          size: 1024,
        }),
        new Photo({
          sessionId: sessionId,
          filename: 'photo2.jpg',
          mimetype: 'image/jpeg',
          size: 2048,
        }),
      ];

      // Create session and photos
      await sessionRepository.create(mockSession);
      await photoRepository.create(mockPhotos[0]);
      await photoRepository.create(mockPhotos[1]);

      const result = await controller.show(sessionId);

      expect(result).toHaveLength(2);
      expect(result).toEqual(mockPhotos);
    });

    it('should return empty array when session has no photos', async () => {
      const mockSession = new Session();
      const sessionId = mockSession.id;

      await sessionRepository.create(mockSession);

      const result = await controller.show(sessionId);

      expect(result).toEqual([]);
    });

    it('should throw error when session not found', async () => {
      const invalidSessionId = 'non-existent-session';

      await expect(controller.show(invalidSessionId)).rejects.toThrow(
        'Sessão não encontrada',
      );
    });
  });

  describe('remove', () => {
    it('should remove a photo successfully', async () => {
      const mockSession = new Session();
      const sessionId = mockSession.id;

      const mockPhoto = new Photo({
        sessionId: sessionId,
        filename: mockFilename,
        mimetype: 'image/jpeg',
        size: 1024,
      });

      // Create session and photo
      await sessionRepository.create(mockSession);
      await photoRepository.create(mockPhoto);

      // Mock file storage
      fileStorage.delete.mockResolvedValue(undefined);

      await controller.remove(sessionId, mockPhoto.id);

      expect(fileStorage.delete).toHaveBeenCalledWith(mockFilename);

      // Verify photo is deleted
      const remainingPhotos = await photoRepository.findBySessionId(sessionId);
      expect(remainingPhotos).toHaveLength(0);
    });

    it('should throw error when photo not found', async () => {
      const mockSession = new Session();
      const sessionId = mockSession.id;

      await sessionRepository.create(mockSession);

      const invalidPhotoId = 'non-existent-photo';

      await expect(
        controller.remove(sessionId, invalidPhotoId),
      ).rejects.toThrow('Foto não encontrada');
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
