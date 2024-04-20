import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from '@prisma/client';

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

  public create(productData: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({
      data: {
        ...productData,
      },
    });
  }

  public async updateById(id: string, productData: CreateProductDto) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    await this.prisma.product.update({
      where: { id },
      data: productData,
    });
    return { message: 'Product updated' };
  }

  public async delete(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    await this.prisma.product.delete({ where: { id } });
    return { message: 'Product deleted' };
  }
}
