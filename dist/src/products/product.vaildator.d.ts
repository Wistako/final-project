/// <reference types="multer" />
import { FileValidator } from '@nestjs/common';
export declare class FileImageValidator extends FileValidator {
    constructor(options: any);
    isValid(file: Express.Multer.File): boolean;
    buildErrorMessage(file: Express.Multer.File): string;
}
