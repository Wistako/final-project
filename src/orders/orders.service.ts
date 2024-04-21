import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Order, Status } from '@prisma/client';
import { CreateOrderDTO } from './dto/create-orderDTO.dto';
import { ProductsService } from 'src/products/products.service';
import { SizeService } from 'src/size/size.service';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private sizeService: SizeService,
    private productsService: ProductsService,
  ) {}

  public getAll(): Promise<Order[]> {
    return this.prisma.order.findMany();
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
    const { items } = data;
    try {
      await Promise.all(
        items.map(async (item) => {
          const product = await this.productsService.getProduct(item.productId);
          const sizes = product.sizes.find((size) => size.size === item.size);
          if (sizes.stock < item.quantity)
            throw new ConflictException(
              `Not enough stock for product ${product.name} in size ${sizes.size}`,
            );
        }),
      );

      await Promise.all(
        items.map(async (item) => {
          const product = await this.productsService.getProduct(item.productId);
          const sizes = product.sizes.find((size) => size.size === item.size);
          await this.sizeService.updateSize({
            ...sizes,
            stock: sizes.stock - item.quantity,
          });
        }),
      );
      return await this.prisma.order.create({
        data: {
          userId,
          items: {
            create: items,
          },
        },
      });
    } catch (error) {
      throw new ConflictException('Order could not be created');
    }
  }

  public async updateStatus(
    id: string,
    status: { status: Status },
  ): Promise<Order> {
    return await this.prisma.order.update({
      where: { id },
      data: { status: status.status },
    });
  }
}
