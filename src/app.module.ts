import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMicroserviceModule } from './auth-microservice/auth-microservice.module';
import { ConfigModule } from '@nestjs/config';
import { existsSync, mkdirSync } from 'fs';
import * as path from 'path';

@Module({
  imports: [
    AuthMicroserviceModule,

    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      expandVariables: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  async onModuleInit(): Promise<void> {
    if (!existsSync(path.join(__dirname, '..', 'logs'))) {
      mkdirSync(path.join(__dirname, '..', 'logs'));
    }
    return;
  }
}