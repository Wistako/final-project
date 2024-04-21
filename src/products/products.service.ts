import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product, ProductSize } from '@prisma/client';
import { SizeService } from 'src/size/size.service';
import { UpdateStockDto } from './dto/update-stock.dto';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private sizeService: SizeService,
  ) {}

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

  public async updateStock(stock: UpdateStockDto) {
    const { productId } = stock;
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) throw new NotFoundException('Product not found');
    await this.sizeService.updateSize(stock);
    return { message: 'Stock updated' };
  }

  public async delete(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    await this.prisma.product.delete({ where: { id } });
    return { message: 'Product deleted' };
  }
}
