import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/strategies/guards/jwt.auth.guard';
import { RegisterDto } from 'src/dto/user/register.dto';
import { ResponseHandlerService } from 'src/common/response/response-handler.service';
import { ApiExtraModels, ApiTags, ApiUnauthorizedResponse, ApiNotFoundResponse, ApiBadRequestResponse, ApiBearerAuth } from '@nestjs/swagger';
import { GenericResponseDto } from 'src/dto/generic-response.dto';
import { Public } from 'src/decorator/is-public.decorator';
import { LoginDto } from 'src/dto/user/login.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
@ApiBearerAuth()
@ApiExtraModels(LoginDto, RegisterDto, GenericResponseDto)
@UseGuards(JwtAuthGuard)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly responseHandler: ResponseHandlerService,
  ) {}

  @Public()
  @Post('register')
  @ApiNotFoundResponse({
    type: GenericResponseDto,
    description: 'Record Not Found!.',
  })
  @ApiBadRequestResponse({
    type: GenericResponseDto,
    description: 'Form Validation Error!. ',
  })
  @ApiUnauthorizedResponse({
    type: GenericResponseDto,
    description: 'Unauthorized!. ',
  })
  async register(@Body() dto: RegisterDto) {
    const data = await this.authService.register(dto);
    return this.responseHandler.HandleResponse(data, 'User registered successfully');
  }

  @Public()
  @Post('login')
  @ApiNotFoundResponse({
    type: GenericResponseDto,
    description: 'Record Not Found!.',
  })
  @ApiBadRequestResponse({
    type: GenericResponseDto,
    description: 'Form Validation Error!. ',
  })
  @ApiUnauthorizedResponse({
    type: GenericResponseDto,
    description: 'Unauthorized!. ',
  })
  async login(@Body() dto: LoginDto) {
    const data = await this.authService.login(dto);
    return this.responseHandler.HandleResponse(data, 'User logged in successfully');
  }
}
