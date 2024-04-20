import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dto/create-orderDTO.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @Get('/')
  getAll() {
    return this.ordersService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user')
  getUserOrders(@Request() req) {
    return this.ordersService.getUserOrders(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  create(@Body() orderData: CreateOrderDTO, @Request() req) {
    return this.ordersService.create(orderData, req.user.id);
  }
}
