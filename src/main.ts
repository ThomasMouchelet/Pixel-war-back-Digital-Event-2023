import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true
  });
  app.enableCors({
    origin: "*",
    methods: ["GET", "POST","PATCH","DELETE","PUT"],
  });
  app.setGlobalPrefix('api/v1');
  const PORT = process.env.PORT || 8000;
  await app.listen(PORT);
}
bootstrap();
