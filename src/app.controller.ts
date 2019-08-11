import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { UserRq } from './auth/rq/user-rq';
import { RegisterRs } from './auth/rs/register-rs';
import { LoginRs } from './auth/rs/login-rs';
import { CatsService } from './cats/cats.service';

@Controller('api')
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly catsService: CatsService,
  ) {}

  @Post('register')
  async register(@Body() userRq: UserRq): Promise<RegisterRs> {
    return await this.authService.register(userRq.login, userRq.password);
  }

  @Post('login')
  async login(@Body() userRq: UserRq): Promise<LoginRs> {
    return await this.authService.login(userRq.login, userRq.password);
  }
}
