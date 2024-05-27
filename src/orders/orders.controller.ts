import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dto/create-orderDTO.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';
import { Status } from '@prisma/client';
import { OptionalJwtAuthGuard } from 'src/auth/optionalJwtAuthGuard';

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
  getUserOrders(@Req() req) {
    console.log('Getting user orders');
    console.log('getUser req', req.user);
    return this.ordersService.getUserOrders(req.user.id);
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Post('/')
  create(@Body() orderData: CreateOrderDTO, @Req() req) {
    console.log('Creating order');
    return this.ordersService.create(orderData, req.user?.id);
  }

  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @Put('/:id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: { status: Status },
  ) {
    if (!this.ordersService.getById(id))
      return new NotFoundException('Order not found');
    const updatedOrder = await this.ordersService.updateStatus(id, body);
    return { message: 'Order updated', order: updatedOrder };
  }
}
