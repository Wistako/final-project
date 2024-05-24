import { PrismaService } from 'src/prisma/prisma.service';
import { Order, Status } from '@prisma/client';
import { CreateOrderDTO } from './dto/create-orderDTO.dto';
import { ProductsService } from 'src/products/products.service';
import { SizeService } from 'src/size/size.service';
import { ConfigService } from '@nestjs/config';
export declare class OrdersService {
    private prisma;
    private sizeService;
    private productsService;
    private configService;
    constructor(prisma: PrismaService, sizeService: SizeService, productsService: ProductsService, configService: ConfigService);
    getAll(): Promise<Order[]>;
    getById(id: string): Promise<Order>;
    getUserOrders(userId: string): Promise<Order[]> | null;
    create(data: CreateOrderDTO, userId?: string): Promise<Order>;
    updateStatus(id: string, status: {
        status: Status;
    }): Promise<Order>;
}
