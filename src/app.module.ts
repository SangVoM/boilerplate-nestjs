import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '@common/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '@api/users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { AppExceptionsFilter } from '@common/filter/app-exceptions.filter';
import * as redisStore from 'cache-manager-redis-store';

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
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = {
          host: configService.get<string>('DB.DB_HOST'),
          port: configService.get<number>('DB.DB_PORT'),
          username: configService.get<string>('DB.DB_USERNAME'),
          password: configService.get<string>('DB.DB_PASSWORD'),
          database: configService.get<string>('DB.DB_DATABASE'),
        };
        return {
          uri: `mongodb://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}?authSource=admin`,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
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
