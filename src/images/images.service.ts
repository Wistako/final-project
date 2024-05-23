import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ImagesService {
  constructor(private prismaService: PrismaService) {}

  async addImage(id: string, filename: string) {
    const product = await this.prismaService.product.findUnique({
      where: { id },
    });
    if (!product) {
      return new NotFoundException('Product not found');
    }
    await this.prismaService.image.create({
      data: {
        product: { connect: { id } },
        name: filename,
      },
    });
    return filename;
  }

  async deleteImage(id: string) {
    const image = await this.prismaService.image.findUnique({
      where: { id },
    });
    if (!image) {
      return null;
    }
    await this.prismaService.image.delete({ where: { id } });
    return image;
  }
}
