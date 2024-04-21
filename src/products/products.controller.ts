import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';
import { UpdateStockDto } from './dto/update-stock.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/')
  getAll() {
    return this.productsService.getAll();
  }

  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @Post('/')
  create(@Body() productData: CreateProductDto) {
    return this.productsService.create(productData);
  }

  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @Put('/stock')
  updateStock(@Body() stock: UpdateStockDto) {
    return this.productsService.updateStock(stock);
  }

  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @Put('/:id')
  updateById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() productData: CreateProductDto,
  ) {
    return this.productsService.updateById(id, productData);
  }

  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @Delete('/:id')
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.productsService.delete(id);
  }
}
