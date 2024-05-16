import { Category } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class CategoryService {
    private prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<Category[]>;
}
