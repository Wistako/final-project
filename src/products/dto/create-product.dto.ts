import { Category } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, Length, Min } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @Length(3, 50)
  @IsString()
  name: string;

  @IsEnum(Category)
  category: Category;

  @IsNotEmpty()
  @Min(1)
  @Transform(({ value }) => parseFloat(value))
  price: number;
}
