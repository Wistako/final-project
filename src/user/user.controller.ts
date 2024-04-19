import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  public async getAll() {
    return await this.userService.getAll();
  }

  @Get(':id')
  public async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.getById(id);
  }
}
