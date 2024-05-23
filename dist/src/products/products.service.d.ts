import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from '@prisma/client';
import { SizeService } from 'src/size/size.service';
import { UpdateStockDto } from './dto/update-stock.dto';
import { ImagesService } from 'src/images/images.service';
export declare class ProductsService {
    private prisma;
    private sizeService;
    private imageService;
    constructor(prisma: PrismaService, sizeService: SizeService, imageService: ImagesService);
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
        images: {
            id: string;
            name: string;
            productId: string;
        }[];
    } & {
        id: string;
        name: string;
        description: string;
        categoryId: string;
        price: number;
        createdAt: Date;
        updatedAt: Date;
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
        images: {
            id: string;
            name: string;
            productId: string;
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
    create(productData: CreateProductDto, file: string): Promise<Product>;
    updateById(id: string, productData: CreateProductDto): Promise<{
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
            images: {
                id: string;
                name: string;
                productId: string;
            }[];
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
            images: {
                id: string;
                name: string;
                productId: string;
            }[];
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
    delete(id: string): Promise<{
        message: string;
    }>;
}
