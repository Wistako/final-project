import { FileValidator } from '@nestjs/common';
import { unlinkSync } from 'fs';

export class FileImageValidator extends FileValidator {
  constructor(options: any) {
    super(options);
  }
  public isValid(file: Express.Multer.File): boolean {
    if (!file.mimetype.startsWith('image/')) {
      unlinkSync(file.path);
      return false;
    } else {
      return true;
    }
  }

  public buildErrorMessage(file: Express.Multer.File): string {
    return `File ${file.originalname} is not an image`;
  }
}
