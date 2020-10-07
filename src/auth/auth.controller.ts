import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Param, Patch, Post, Req } from '@nestjs/common';

import { AuthLoginCmd } from './cmd/auth-login.command';
import { AuthService } from './auth.service';
import { AuthSignUpCmd } from './cmd/auth-sign-up.cmd';
import { TokenDto } from './dto/token.dto';
import { User } from '../users/user.entity';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Sign-up', description: 'Register user. Returns a valid JWT.' })
  @ApiResponse({ description: 'Success!', status: HttpStatus.OK, type: TokenDto })
  @ApiResponse({ description: 'Bad request.', status: HttpStatus.BAD_REQUEST })
  public async signUp(@Body() user: AuthSignUpCmd): Promise<TokenDto> {
    return await this.authService.signUp(new User(user));
  }

  @Post('login')
  @ApiBody({ description: 'AuthLoginCmd', type: AuthLoginCmd })
  @ApiOperation({ summary: 'Login', description: 'Login user. Generate a new valid JWT.' })
  @ApiResponse({ description: 'JWT successfully created.', status: HttpStatus.CREATED, type: TokenDto })
  @ApiResponse({ description: 'Bad request.', status: HttpStatus.BAD_REQUEST })
  public async login(@Req() req): Promise<TokenDto> {
    return await this.authService.createToken(new User(req.user));
  }

}
