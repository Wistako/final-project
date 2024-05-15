import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
  Min,
} from 'class-validator';

class OrderItemDTO {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @Min(1)
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  sizeId: string;

  @IsString()
  description?: string;
}

export class CreateOrderDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(3, 255)
  @IsNotEmpty()
  name: string;

  @Length(3, 255)
  @IsNotEmpty()
  surname: string;

  @Length(3, 255)
  @IsNotEmpty()
  address: string;

  @Length(3, 255)
  @IsNotEmpty()
  city: string;

  @Length(6)
  @IsNotEmpty()
  zipCode: string;

  @Length(9)
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  items: OrderItemDTO[];
}
