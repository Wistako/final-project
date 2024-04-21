import { Injectable } from '@nestjs/common';
import { ProductSize } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateStockDto } from 'src/products/dto/update-stock.dto';

@Injectable()
export class SizeService {
  constructor(private prisma: PrismaService) {}

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
      where: { productId: data.productId, size: data.size },
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
