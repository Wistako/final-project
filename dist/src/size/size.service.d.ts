import { ProductSize, Size } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateStockDto } from 'src/products/dto/update-stock.dto';
export declare class SizeService {
    private prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<Size[]>;
    getSize(id: string): Promise<ProductSize>;
    getSizeByProductId(productId: string): Promise<ProductSize[]>;
    updateSize(data: UpdateStockDto): Promise<ProductSize>;
}
