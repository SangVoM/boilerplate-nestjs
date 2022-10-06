import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { ConfigService } from '@nestjs/config';
import { AppExceptionsFilter } from '@common/filter/app-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const restPrefix = app.get(ConfigService).get<string>('APP_PREFIX');
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.setGlobalPrefix(restPrefix);
  app.useGlobalFilters(new AppExceptionsFilter(httpAdapter));
  app.use(helmet());
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.use(
    rateLimit({
      windowMs: 60, // 1 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  const port = process.env.APP_PORT;
  const host = process.env.APP_HOST;
  await app.listen(port, host);
  console.info(`🌍 Server is running at http://${host}:${port}`);
}
bootstrap();
