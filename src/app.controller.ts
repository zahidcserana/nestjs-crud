import { Get, Controller, HttpStatus, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthLoginCmd } from './auth/cmd/auth-login.command';
import { TokenDto } from './auth/dto/token.dto';
import { User } from './users/user.entity';
import { AuthService } from './auth/auth.service';

@ApiTags('root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) { }

  @Get()
  root(): string {
    return this.appService.root();
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
