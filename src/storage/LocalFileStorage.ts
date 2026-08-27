import { randomUUID } from 'crypto';
import { mkdir, writeFile, rm } from 'node:fs/promises';
import { FileStorage } from './FileStorage';
import path from 'node:path';

export class LocalFileStorage implements FileStorage {
  private readonly storagePath = path.resolve('storage');

  async save(file: Express.Multer.File): Promise<string> {
    await mkdir(this.storagePath, { recursive: true });

    const extension = path.extname(file.originalname);
    const filename = `${randomUUID()}${extension}`;

    const filePath = path.join(this.storagePath, filename);

    await writeFile(filePath, file.buffer);

    return filename;
  }

  async delete(filename: string): Promise<void> {
    const filePath = path.join(this.storagePath, filename);

    await rm(filePath);
  }
}
