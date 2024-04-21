import { Size } from '@prisma/client';

export class UpdateStockDto {
  productId: string;
  size: Size;
  stock: number;
}
