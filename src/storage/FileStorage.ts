export abstract class FileStorage {
  abstract save(files: Express.Multer.File): Promise<string>;
  abstract delete(filename: string): Promise<void>;
}
