import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://192.168.200.197:5173',
      process.env.FRONTEND_URL,
    ].filter((origin): origin is string => Boolean(origin)),
  });

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}

void bootstrap();
