import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '@common/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@api/user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { AppExceptionsFilter } from '@common/filter/app-exceptions.filter';
import * as redisStore from 'cache-manager-redis-store';
import { join } from 'path';

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
      useFactory: (configService: ConfigService) => ({
        type: configService.get<any>('DB.DB_CONNECTION'),
        host: configService.get<string>('DB.DB_HOST'),
        port: configService.get<number>('DB.DB_PORT'),
        username: configService.get<string>('DB.DB_USERNAME'),
        password: configService.get<string>('DB.DB_PASSWORD'),
        database: configService.get<string>('DB.DB_DATABASE'),
        schema: configService.get<string>('DB.DB_SCHEMA'),
        entities: [
          join(__dirname, '**/entities/*{.entity.ts,.entity.js}'),
          join(__dirname, '**/data/*{.entity.ts,.entity.js}'),
        ],
        logging: configService.get<boolean>('DB.DB_LOGGING'),
        synchronize: configService.get<string>('DB.DB_SYNCHRONIZE') === 'true',
        cache: true,
      }),
    }),
    UserModule,
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
