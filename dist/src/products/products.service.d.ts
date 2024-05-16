import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from '@prisma/client';
import { SizeService } from 'src/size/size.service';
import { UpdateStockDto } from './dto/update-stock.dto';
export declare class ProductsService {
    private prisma;
    private sizeService;
    constructor(prisma: PrismaService, sizeService: SizeService);
    getAll(): import(".prisma/client").Prisma.PrismaPromise<({
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
        image: string;
    })[]>;
    getProduct(id: string): import(".prisma/client").Prisma.Prisma__ProductClient<{
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
        image: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    create(productData: CreateProductDto, file: string): Promise<Product>;
    updateById(id: string, productData: CreateProductDto, file?: string): Promise<{
        message: string;
        product: {
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
            image: string;
        };
    }>;
    updateStock(stock: UpdateStockDto): Promise<{
        message: string;
        product: {
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
            image: string;
        };
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
