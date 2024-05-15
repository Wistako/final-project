import { Injectable } from '@nestjs/common';
import { ProductSize, Size } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateStockDto } from 'src/products/dto/update-stock.dto';

@Injectable()
export class SizeService {
  constructor(private prisma: PrismaService) {}

  public getAll(): Promise<Size[]> {
    return this.prisma.size.findMany();
  }

  public getSize(id: string): Promise<ProductSize> {
    return this.prisma.productSize.findUnique({
      where: { id },
    });
  }

  public getSizeByProductId(productId: string): Promise<ProductSize[]> {
    return this.prisma.productSize.findMany({
      where: { productId },
    });
  }

  public async updateSize(data: UpdateStockDto): Promise<ProductSize> {
    const sizeExists = await this.prisma.productSize.findFirst({
      where: { productId: data.productId, sizeId: data.sizeId },
    });
    if (sizeExists) {
      return this.prisma.productSize.update({
        where: { id: sizeExists.id },
        data,
      });
    } else {
      return this.prisma.productSize.create({
        data,
      });
    }
  }
}
