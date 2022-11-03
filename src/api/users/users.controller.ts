import {
  Controller,
  Get,
  UseInterceptors,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ResponseInterceptor } from '@common/interceptor/response.Interceptor';
import { JwtAuthGuard } from '@common/guard/jwt-auth.guard';

@UseInterceptors(ResponseInterceptor)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req) {
    console.log('REQ:', req);
  }
}
