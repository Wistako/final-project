import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as cors from 'cors';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { SizeModule } from './size/size.module';
import configuration from './config/configuration';
import { MulterModule } from '@nestjs/platform-express';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    ProductsModule,
    OrdersModule,
    SizeModule,
    MulterModule.register({
      dest: './uploads',
      limits: { fileSize: 1000000 },
    }),
    ImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(cors({ credentials: true })).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
