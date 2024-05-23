import { NotFoundException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dto/create-orderDTO.dto';
import { Status } from '@prisma/client';
export declare class OrdersController {
    private ordersService;
    constructor(ordersService: OrdersService);
    getAll(): Promise<{
        id: string;
        email: string;
        name: string;
        surname: string;
        address: string;
        city: string;
        zipCode: string;
        phone: string;
        total: number;
        userId: string;
        status: import(".prisma/client").$Enums.Status;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getUserOrders(req: any): Promise<{
        id: string;
        email: string;
        name: string;
        surname: string;
        address: string;
        city: string;
        zipCode: string;
        phone: string;
        total: number;
        userId: string;
        status: import(".prisma/client").$Enums.Status;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    create(orderData: CreateOrderDTO, req: any): Promise<{
        id: string;
        email: string;
        name: string;
        surname: string;
        address: string;
        city: string;
        zipCode: string;
        phone: string;
        total: number;
        userId: string;
        status: import(".prisma/client").$Enums.Status;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, body: {
        status: Status;
    }): Promise<NotFoundException | {
        message: string;
        order: {
            id: string;
            email: string;
            name: string;
            surname: string;
            address: string;
            city: string;
            zipCode: string;
            phone: string;
            total: number;
            userId: string;
            status: import(".prisma/client").$Enums.Status;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
