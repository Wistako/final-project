import { Controller, Get, Param, Res } from '@nestjs/common';
import { join } from 'path';
import { Response } from 'express';

@Controller('images')
export class ImagesController {
  @Get(':imgName')
  async getImage(@Param('imgName') imageName: string, @Res() res: Response) {
    const imagePath = join(__dirname, '..', '..', '..', 'uploads', imageName);

    return res.sendFile(imagePath);
  }
}
