import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { join } from 'path';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';
import { diskStorage } from 'multer';
import { unlinkSync } from 'fs';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @Get('/:imgName')
  async getImage(@Param('imgName') imageName: string, @Res() res: Response) {
    const imagePath = join(__dirname, '..', '..', '..', 'uploads', imageName);
    return res.sendFile(imagePath);
  }

  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  )
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @Post('/:id')
  async addImage(
    @Param('id', new ParseUUIDPipe()) id: string,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (image.mimetype.startsWith('image/') === false) {
      unlinkSync(image.path);
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'File is not an image',
      };
    }
    return await this.imagesService.addImage(id, image.filename);
  }

  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @Delete('/:id')
  async deleteImage(@Param('id', new ParseUUIDPipe()) id: string) {
    const image = await this.imagesService.deleteImage(id);
    if (!image) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Image not found',
      };
    }
    unlinkSync(join(__dirname, '..', '..', '..', 'uploads', image.name));
    return {
      statusCode: HttpStatus.OK,
      message: 'Image deleted',
    };
  }
}
