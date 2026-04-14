import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/strategies/guards/jwt.auth.guard';
import { ResponseHandlerService } from 'src/common/response/response-handler.service';
import { ApiBearerAuth, ApiExtraModels } from '@nestjs/swagger';
import { GenericResponseDto } from 'src/dto/generic-response.dto';
import { ApiGenericResponse } from 'src/decorator/generic-response.decorator';
import { UserService } from 'src/bll/user.service';
import { ReadMyUserDto } from 'src/dto/user/read-my-user.dto';

@Controller('users')
@ApiExtraModels(ReadMyUserDto, GenericResponseDto)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly responseHandler: ResponseHandlerService,
  ) {}

  @Get('/all')
  @ApiGenericResponse({ type: ReadMyUserDto })
  async findAllUsers() {
    const users = await this.userService.findAllUsers();
    return this.responseHandler.HandleResponse(users, 'Users fetched successfully');
  }

  @Get('/me')
  @ApiGenericResponse({ type: ReadMyUserDto })
  async findMe(@Req() req: any) {
    const user = await this.userService.findUserById(req.user.id);
    return this.responseHandler.HandleResponse(user, 'User fetched successfully');
  }
}
