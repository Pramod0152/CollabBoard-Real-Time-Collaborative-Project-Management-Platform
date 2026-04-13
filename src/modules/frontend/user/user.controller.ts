import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/strategies/guards/jwt.auth.guard';
import { ResponseHandlerService } from 'src/common/response/response-handler.service';
import { ApiBearerAuth, ApiExtraModels } from '@nestjs/swagger';
import { ReadUserDto } from 'src/dto/user/read-user.dto';
import { GenericResponseDto } from 'src/dto/generic-response.dto';
import { ApiGenericResponse } from 'src/decorator/generic-response.decorator';
import { UserService } from 'src/bll/user.service';

@Controller('users')
@ApiExtraModels(ReadUserDto, GenericResponseDto)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly responseHandler: ResponseHandlerService,
  ) {}

  @Get('/all')
  @ApiGenericResponse({ type: ReadUserDto })
  async findAllUsers() {
    const users = await this.userService.findAllUsers();
    return this.responseHandler.HandleResponse(users, 'Users fetched successfully');
  }

  @Get('/me')
  @ApiGenericResponse({ type: ReadUserDto })
  async findMe(@Req() req: any) {
    const user = await this.userService.findUserById(req.user.id);
    return this.responseHandler.HandleResponse(user, 'User fetched successfully');
  }
}
