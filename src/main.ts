import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove thrash data from dto in request
      forbidNonWhitelisted: true, // thwo error with extra properties not declared in dto
      transform: true, // add this and options to admit the transformation of parameters to type implicit in dto
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.setGlobalPrefix('api/v1/');

  await app.listen(3000);
}

bootstrap();
