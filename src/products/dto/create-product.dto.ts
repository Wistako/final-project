import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID, Length, Min } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @Length(3, 30)
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @IsNotEmpty()
  @Min(1)
  @Transform(({ value }) => parseFloat(value))
  price: number;

  @IsNotEmpty()
  @Length(10, 255)
  description: string;
}
