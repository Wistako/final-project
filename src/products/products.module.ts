import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SizeModule } from 'src/size/size.module';
import { ImagesModule } from 'src/images/images.module';

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  imports: [PrismaModule, SizeModule, ImagesModule],
  exports: [ProductsService],
})
export class ProductsModule {}
