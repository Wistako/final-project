import { ConflictException, Injectable, ParseUUIDPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Order, Status } from '@prisma/client';
import { CreateOrderDTO } from './dto/create-orderDTO.dto';
import { ProductsService } from 'src/products/products.service';
import { SizeService } from 'src/size/size.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private sizeService: SizeService,
    private productsService: ProductsService,
    private configService: ConfigService,
  ) {}

  public getAll(): Promise<Order[]> {
    return this.prisma.order.findMany({
      include: { items: { include: { product: true, size: true } } },
    });
  }

  public getById(id: string): Promise<Order> {
    return this.prisma.order.findUnique({ where: { id } });
  }

  public getUserOrders(userId: string): Promise<Order[]> | null {
    return this.prisma.order.findMany({
      where: { userId },
      include: { items: true },
    });
  }

  public async create(data: CreateOrderDTO, userId: string): Promise<Order> {
    const { items, ...rest } = data;
    if (!items || items.length === 0) {
      throw new ConflictException('Order must have at least one item');
    }
    try {
      await Promise.all(
        items.map(async (item) => {
          const product = await this.productsService.getProduct(item.productId);
          const sizes = product.sizes.find(
            (size) => size.sizeId === item.sizeId,
          );
          if (!sizes || sizes.stock < item.quantity) {
            console.log('Not enough stock');
            throw new ConflictException(
              `Not enough stock for product ${product.name} in size ${sizes.sizeId}`,
            );
          }
        }),
      );
      await Promise.all(
        items.map(async (item) => {
          const product = await this.productsService.getProduct(item.productId);
          const sizes = product.sizes.find(
            (size) => size.sizeId === item.sizeId,
          );
          await this.sizeService.updateSize({
            ...sizes,
            stock: sizes.stock - item.quantity,
          });
        }),
      );

      let total = 0;
      for (const item of items) {
        const product = await this.productsService.getProduct(item.productId);
        const { price } = product;
        total += item.quantity * price;
      }
      total += this.configService.get<number>('shippingCost');

      const order = await this.prisma.order.create({
        data: {
          ...rest,
          items: {
            create: items,
          },
          total,
          userId: userId ? userId : null,
        },
      });
      return order;
    } catch (error) {
      throw new ConflictException(
        { ...rest, items: items },
        'Order could not be created',
      );
    }
  }

  public async updateStatus(
    id: string,
    status: { status: Status },
  ): Promise<Order> {
    return await this.prisma.order.update({
      where: { id },
      data: { status: status.status },
      include: { items: { include: { product: true, size: true } } },
    });
  }
}
