/// <reference types="jest" />
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { PhotoService } from './photo.service';
import { PhotoRepository } from '@/repositories/PhotoRepository';
import { SessionRepository } from '@/repositories/SessionRepository';
import { FileStorage } from '@/storage/FileStorage';
import { Photo } from './entities/Photo';
import { Session } from '@/session/entities/Session';
import { InMemoryPhotoRepository } from '@/repositories/inMemoryRepositories/InMemoryPhotoRepository';
import { InMemorySessionRepository } from '@/repositories/inMemoryRepositories/InMemorySessionRepository';

describe('PhotoService', () => {
  let service: PhotoService;
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
      providers: [
        PhotoService,
        { provide: PhotoRepository, useValue: photoRepository },
        { provide: SessionRepository, useValue: sessionRepository },
        { provide: FileStorage, useValue: fileStorage },
      ],
    }).compile();

    service = module.get<PhotoService>(PhotoService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create photos successfully', async () => {
      const mockSession = new Session();
      const sessionId = mockSession.id;

      const mockFile: Express.Multer.File = {
        fieldname: 'files',
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

      const result = await service.create(sessionId, [mockFile]);

      expect(fileStorage.save).toHaveBeenCalledWith(mockFile);
      expect(result).toHaveLength(1);
      expect(result[0].filename).toBe(mockFilename);
    });

    it('should throw error when session not found', async () => {
      const mockFile: Express.Multer.File = {
        fieldname: 'files',
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

      // Try to create with non-existent session
      const invalidSessionId = 'non-existent-session';

      await expect(
        service.create(invalidSessionId, [mockFile]),
      ).rejects.toThrow('Sessão não encontrada.');
    });

    it('should delete saved file if photo creation fails', async () => {
      const mockSession = new Session();
      const sessionId = mockSession.id;

      const mockFile: Express.Multer.File = {
        fieldname: 'files',
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

      // Mock file storage and make photo creation fail
      fileStorage.save.mockResolvedValue(mockFilename);

      // Spy on photoRepository to make it fail
      jest
        .spyOn(photoRepository, 'create')
        .mockRejectedValueOnce(new Error('Database error'));

      await expect(service.create(sessionId, [mockFile])).rejects.toThrow();

      expect(fileStorage.delete).toHaveBeenCalledWith(mockFilename);
    });

    it('should handle multiple files', async () => {
      const mockSession = new Session();
      const sessionId = mockSession.id;

      const mockFiles: Express.Multer.File[] = [
        {
          fieldname: 'files',
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
          fieldname: 'files',
          originalname: 'test2.jpg',
          encoding: '7bit',
          mimetype: 'image/jpeg',
          size: 2048,
          destination: './uploads',
          filename: 'file2.jpg',
          path: './uploads/test2.jpg',
          buffer: Buffer.from('test'),
          stream: null,
        } as any,
      ];

      // Create session in repository
      await sessionRepository.create(mockSession);

      // Mock file storage
      fileStorage.save
        .mockResolvedValueOnce('file1.jpg')
        .mockResolvedValueOnce('file2.jpg');

      const result = await service.create(sessionId, mockFiles);

      expect(result).toHaveLength(2);
      expect(fileStorage.save).toHaveBeenCalledTimes(2);
    });
  });

  describe('getPhotoById', () => {
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

      const result = await service.getPhotoById(sessionId, mockPhoto.id);

      expect(result).toEqual(mockPhoto);
    });

    it('should throw error when session not found', async () => {
      const invalidSessionId = 'non-existent-session';
      const invalidPhotoId = 'non-existent-photo';

      await expect(
        service.getPhotoById(invalidSessionId, invalidPhotoId),
      ).rejects.toThrow('Sessão não encontrada');
    });

    it('should throw error when photo not found', async () => {
      const mockSession = new Session();
      const sessionId = mockSession.id;

      // Create session but not photo
      await sessionRepository.create(mockSession);

      const invalidPhotoId = 'non-existent-photo';

      await expect(
        service.getPhotoById(sessionId, invalidPhotoId),
      ).rejects.toThrow('Foto não encontrada');
    });
  });

  describe('getPhotosBySessionId', () => {
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

      // Create session and photos in repository
      await sessionRepository.create(mockSession);
      await photoRepository.create(mockPhotos[0]);
      await photoRepository.create(mockPhotos[1]);

      const result = await service.getPhotosBySessionId(sessionId);

      expect(result).toHaveLength(2);
      expect(result).toEqual(mockPhotos);
    });

    it('should return empty array when no photos found', async () => {
      const mockSession = new Session();
      const sessionId = mockSession.id;

      // Create session but no photos
      await sessionRepository.create(mockSession);

      const result = await service.getPhotosBySessionId(sessionId);

      expect(result).toEqual([]);
    });

    it('should throw error when session not found', async () => {
      const invalidSessionId = 'non-existent-session';

      await expect(
        service.getPhotosBySessionId(invalidSessionId),
      ).rejects.toThrow('Sessão não encontrada');
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

      // Create session and photo in repository
      await sessionRepository.create(mockSession);
      await photoRepository.create(mockPhoto);

      // Mock file storage
      fileStorage.delete.mockResolvedValue(undefined);

      await service.remove(sessionId, mockPhoto.id);

      expect(fileStorage.delete).toHaveBeenCalledWith(mockFilename);

      // Verify photo is actually deleted
      const remainingPhotos = await photoRepository.findBySessionId(sessionId);
      expect(remainingPhotos).toHaveLength(0);
    });

    it('should throw error when photo not found', async () => {
      const mockSession = new Session();
      const sessionId = mockSession.id;

      // Create session but no photos
      await sessionRepository.create(mockSession);

      const invalidPhotoId = 'non-existent-photo';

      await expect(service.remove(sessionId, invalidPhotoId)).rejects.toThrow(
        'Foto não encontrada',
      );
    });
  });

  describe('removeMany', () => {
    it('should remove all photos from a session', async () => {
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

      // Create session and photos in repository
      await sessionRepository.create(mockSession);
      await photoRepository.create(mockPhotos[0]);
      await photoRepository.create(mockPhotos[1]);

      // Mock file storage
      fileStorage.delete.mockResolvedValue(undefined);

      await service.removeMany(sessionId);

      expect(fileStorage.delete).toHaveBeenCalledTimes(2);
      expect(fileStorage.delete).toHaveBeenNthCalledWith(1, 'photo1.jpg');
      expect(fileStorage.delete).toHaveBeenNthCalledWith(2, 'photo2.jpg');

      // Verify all photos are deleted
      const remainingPhotos = await photoRepository.findBySessionId(sessionId);
      expect(remainingPhotos).toHaveLength(0);
    });

    it('should handle removing session with no photos', async () => {
      const mockSession = new Session();
      const sessionId = mockSession.id;

      // Create session but no photos
      await sessionRepository.create(mockSession);

      fileStorage.delete.mockResolvedValue(undefined);

      await service.removeMany(sessionId);

      expect(fileStorage.delete).not.toHaveBeenCalled();
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
