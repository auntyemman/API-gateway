import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpLogger } from './common/middlewares/http-logger.middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('MAIN');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/v1');
  app.enableCors();

  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');
  app.use(new HttpLogger().use);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Thrillers Treavels APIs')
    .setDescription('Documentation for NestJS APIs')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/v1/doc', app, document);

  await app.listen(port, () => logger.log(`App running on Port: ${port}`));
}
bootstrap();
