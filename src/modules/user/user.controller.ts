import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from '../../bll/user.service';
import { JwtAuthGuard } from 'src/strategies/guards/jwt.auth.guard';
import { RegisterDto } from 'src/dto/user/register.dto';

@Controller('users')
// @UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.userService.register(dto);
  }

  @Get()
  findAllUsers() {
    return this.userService.findAllUsers();
  }
}
