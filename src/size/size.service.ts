import { Injectable } from '@nestjs/common';
import { ProductSize } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

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

  public updateSize(id: string, data: ProductSize): Promise<ProductSize> {
    return this.prisma.productSize.update({
      where: { id },
      data,
    });
  }
}
