import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { HashBcrypt } from '@common/bcrypt/hash.bcrypt';
import { JwtStrategy } from '@common/jwt/jwt.strategy';

@Module({
  controllers: [UsersController],
  providers: [UsersService, HashBcrypt, JwtStrategy],
  imports: [],
  exports: [UsersService],
})
export class UsersModule {}
