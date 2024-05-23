/// <reference types="multer" />
import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ImagesService } from './images.service';
export declare class ImagesController {
    private imagesService;
    constructor(imagesService: ImagesService);
    getImage(imageName: string, res: Response): Promise<void>;
    addImage(id: string, image: Express.Multer.File): Promise<string | import("@nestjs/common").NotFoundException | {
        statusCode: HttpStatus;
        message: string;
    }>;
    deleteImage(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
