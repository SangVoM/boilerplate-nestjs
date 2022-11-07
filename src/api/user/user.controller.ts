import {
  Controller,
  Get,
  UseInterceptors,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseInterceptor } from '@common/interceptor/response.Interceptor';
import { JwtAuthGuard } from '@common/guard/jwt-auth.guard';

@UseInterceptors(ResponseInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req) {
    console.log('REQ:', req.user);
  }
}
