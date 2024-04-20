import { Module } from '@nestjs/common';
import { SizeService } from './size.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SizeService],
  exports: [SizeService],
})
export class SizeModule {}
