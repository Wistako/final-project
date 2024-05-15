import { Controller, Get } from '@nestjs/common';
import { SizeService } from './size.service';

@Controller('size')
export class SizeController {
  constructor(private sizeService: SizeService) {}

  @Get('/')
  public getAll() {
    return this.sizeService.getAll();
  }
}
