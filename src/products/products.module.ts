import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SizeModule } from 'src/size/size.module';

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  imports: [PrismaModule, SizeModule],
  exports: [ProductsService],
})
export class ProductsModule {}
