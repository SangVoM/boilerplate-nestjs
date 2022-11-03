import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '@common/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@api/users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { AppExceptionsFilter } from '@common/filter/app-exceptions.filter';
import * as redisStore from 'cache-manager-redis-store';
import { TypeOrmConfigService } from '@common/config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: config,
    }),
    CacheModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        isGlobal: true,
        store: redisStore,
        host: configService.get<string>('REDIS.HOST'),
        port: configService.get<number>('REDIS.PORT'),
        password: configService.get<string>('REDIS.PASSWORD'),
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useClass: TypeOrmConfigService,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AppExceptionsFilter,
    },
  ],
})
export class AppModule {}
