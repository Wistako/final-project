import { Size } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsUUID, Min } from 'class-validator';

class OrderItemDTO {
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @Min(1)
  @IsNotEmpty()
  quantity: number;

  @IsEnum(Size)
  size: Size;
}

export class CreateOrderDTO {
  @IsNotEmpty()
  items: OrderItemDTO[];
}
