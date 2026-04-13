import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from '../../bll/user.service';
import { JwtAuthGuard } from 'src/strategies/guards/jwt.auth.guard';
import { RegisterDto } from 'src/dto/user/register.dto';
import { ResponseHandlerService } from 'src/common/response/response-handler.service';
import { ApiExtraModels, ApiResponse } from '@nestjs/swagger';
import { ReadUserDto } from 'src/dto/user/read-user.dto';
import { GenericResponseDto } from 'src/dto/generic-response.dto';
import { ApiGenericResponse } from 'src/decorator/generic-response.decorator';

@Controller('users')
@ApiExtraModels(ReadUserDto, RegisterDto, GenericResponseDto)
// @UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly responseHandler: ResponseHandlerService,
  ) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.userService.register(dto);
  }

  @Get('/all')
  @ApiGenericResponse({ type: ReadUserDto })
  async findAllUsers() {
    const users = await this.userService.findAllUsers();
    return this.responseHandler.HandleResponse(users, 'Users fetched successfully');
  }
}
