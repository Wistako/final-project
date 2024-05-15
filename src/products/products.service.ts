import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from '@prisma/client';
import { SizeService } from 'src/size/size.service';
import { UpdateStockDto } from './dto/update-stock.dto';
import { unlinkSync } from 'fs';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private sizeService: SizeService,
  ) {}

  public getAll() {
    return this.prisma.product.findMany({
      include: {
        sizes: {
          include: {
            size: true,
          },
        },
        category: true,
      },
    });
  }

  public getProduct(id: string) {
    const prod = this.prisma.product.findUnique({
      where: { id },
      include: { sizes: true, category: true },
    });
    if (!prod) throw new NotFoundException('Product not found');
    return prod;
  }

  public async create(
    productData: CreateProductDto,
    file: string,
  ): Promise<Product> {
    const prod = await this.prisma.product.create({
      data: {
        ...productData,
        image: file,
      },
    });
    const newProdukt = await this.prisma.product.findUnique({
      where: { id: prod.id },
      include: { sizes: true, category: true },
    });
    return newProdukt;
  }

  public async updateById(
    id: string,
    productData: CreateProductDto,
    file?: string,
  ) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    if (file) {
      unlinkSync(`./uploads/${product.image}`);
    }
    await this.prisma.product.update({
      where: { id },
      data: {
        ...productData,
        image: file ? file : product.image,
      },
    });
    const updatedProd = await this.prisma.product.findUnique({
      where: { id },
      include: { sizes: { include: { size: true } }, category: true },
    });
    return {
      message: 'Product updated',
      product: updatedProd,
    };
  }

  public async updateStock(stock: UpdateStockDto) {
    const { productId } = stock;
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) throw new NotFoundException('Product not found');
    await this.sizeService.updateSize(stock);
    const updatedProduct = await this.prisma.product.findUnique({
      where: { id: productId },
      include: { sizes: { include: { size: true } }, category: true },
    });
    return { message: 'Stock updated', product: updatedProduct };
  }

  public async delete(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    await this.prisma.product.delete({ where: { id } });
    return { message: 'Product deleted' };
  }
}
