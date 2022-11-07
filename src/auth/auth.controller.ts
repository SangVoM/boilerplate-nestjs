import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginPayloadDto } from './dto/login-payload.dto';
import { ResponseInterceptor } from '@common/interceptor/response.Interceptor';
import { RegisterPayloadDto } from './dto/register-payload.dto';

@UseInterceptors(ResponseInterceptor)
@Controller('auth')
export class AuthController {
  /**
   * Constructor
   * @param {AuthService} authService authentication service
   */

  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() payload: LoginPayloadDto) {
    const result = await this.authService.login(payload);
    return {
      result: { token: result.token, refreshToken: result.refreshToken },
    };
  }

  @Post('register')
  async register(@Body() payload: RegisterPayloadDto) {
    const result = await this.authService.register(payload);
    return { result: { token: result } };
  }
}
