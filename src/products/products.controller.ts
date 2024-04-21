import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';
import { UpdateStockDto } from './dto/update-stock.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { unlinkSync } from 'fs';
import { getImageFileType } from 'src/utils/getImageFileType';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/')
  getAll() {
    return this.productsService.getAll();
  }
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  )
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @Post('/')
  async create(
    @Body() productData: CreateProductDto,
    @UploadedFile()
    image: Express.Multer.File | undefined,
  ) {
    if (image.mimetype.startsWith('image/') === false) {
      unlinkSync(image.path);
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'File is not an image',
      };
    }
    return await this.productsService.create(productData, image.filename);
  }

  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @Put('/stock')
  updateStock(@Body() stock: UpdateStockDto) {
    return this.productsService.updateStock(stock);
  }

  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  )
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @Put('/:id')
  async updateById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() productData: CreateProductDto,
    @UploadedFile() image: Express.Multer.File | undefined,
  ) {
    if (image)
      if (image.mimetype.startsWith('image/') === false) {
        unlinkSync(image.path);
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'File is not an image',
        };
      }
    return this.productsService.updateById(id, productData, image?.filename);
  }

  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @Delete('/:id')
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.productsService.delete(id);
  }
}
