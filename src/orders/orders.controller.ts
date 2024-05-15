import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dto/create-orderDTO.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';
import { Status } from '@prisma/client';

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
  create(@Body() orderData: CreateOrderDTO) {
    console.log('Creating order');
    return this.ordersService.create(orderData);
  }

  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @Put('/:id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: { status: Status },
  ) {
    const updatedOrder = await this.ordersService.updateStatus(id, body);
    return { message: 'Order updated', order: updatedOrder };
  }
}
