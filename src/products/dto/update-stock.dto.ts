import { Transform } from 'class-transformer';
import { IsNotEmpty, IsUUID, Min } from 'class-validator';

export class UpdateStockDto {
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  @IsUUID()
  sizeId: string;

  @IsNotEmpty()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  stock: number;
}
