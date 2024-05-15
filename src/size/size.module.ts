import { Module } from '@nestjs/common';
import { SizeService } from './size.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SizeController } from './size.controller';

@Module({
  imports: [PrismaModule],
  providers: [SizeService],
  exports: [SizeService],
  controllers: [SizeController],
})
export class SizeModule {}
