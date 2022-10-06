import { Module } from '@nestjs/common';
import { UsersModule } from '@api/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HashBcrypt } from '@common/bcrypt/hash.bcrypt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@common/jwt/jwt.strategy';

@Module({
  imports: [UsersModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, HashBcrypt, JwtStrategy],
  exports: [],
})
export class AuthModule {}
