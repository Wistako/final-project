import { Category } from '@prisma/client';

export class CreateProductDto {
  name: string;
  category: Category;
  price: number;
}
