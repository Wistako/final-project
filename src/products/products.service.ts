import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  public getAll() {
    return this.prisma.product.findMany({ include: { sizes: true } });
  }

  public getProduct(id: string) {
    const prod = this.prisma.product.findUnique({
      where: { id },
      include: { sizes: true },
    });
    if (!prod) throw new NotFoundException('Product not found');
    return prod;
  }
}
