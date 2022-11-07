import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HashBcrypt } from '@common/bcrypt/hash.bcrypt';
import { JwtStrategy } from '@common/jwt/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@api/user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [UserController],
  providers: [UserService, HashBcrypt, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
