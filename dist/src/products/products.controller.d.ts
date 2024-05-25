/// <reference types="multer" />
import { HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
export declare class ProductsController {
    private productsService;
    constructor(productsService: ProductsService);
    getAll(): import(".prisma/client").Prisma.PrismaPromise<({
        images: {
            id: string;
            name: string;
            productId: string;
        }[];
        category: {
            id: string;
            name: string;
        };
        sizes: ({
            size: {
                id: string;
                name: string;
            };
        } & {
            id: string;
            productId: string;
            sizeId: string;
            stock: number;
        })[];
    } & {
        id: string;
        name: string;
        description: string;
        categoryId: string;
        price: number;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getById(id: string): import(".prisma/client").Prisma.Prisma__ProductClient<{
        images: {
            id: string;
            name: string;
            productId: string;
        }[];
        category: {
            id: string;
            name: string;
        };
        sizes: {
            id: string;
            productId: string;
            sizeId: string;
            stock: number;
        }[];
    } & {
        id: string;
        name: string;
        description: string;
        categoryId: string;
        price: number;
        createdAt: Date;
        updatedAt: Date;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    create(productData: CreateProductDto, image: Express.Multer.File | undefined): Promise<{
        id: string;
        name: string;
        description: string;
        categoryId: string;
        price: number;
        createdAt: Date;
        updatedAt: Date;
    } | {
        statusCode: HttpStatus;
        message: string;
    }>;
    updateStock(stock: UpdateStockDto): Promise<{
        message: string;
        product: {
            images: {
                id: string;
                name: string;
                productId: string;
            }[];
            category: {
                id: string;
                name: string;
            };
            sizes: ({
                size: {
                    id: string;
                    name: string;
                };
            } & {
                id: string;
                productId: string;
                sizeId: string;
                stock: number;
            })[];
        } & {
            id: string;
            name: string;
            description: string;
            categoryId: string;
            price: number;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    updateById(id: string, productData: CreateProductDto, res: any): Promise<any>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
