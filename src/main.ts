import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const start = async () => {
  try {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 4000;
    app.setGlobalPrefix('api');

    await app.listen(PORT, () => {
      console.log(`Server  listening on ${PORT}`);
    })
  } catch (error) {
    console.log(error);
  }
}

start();


