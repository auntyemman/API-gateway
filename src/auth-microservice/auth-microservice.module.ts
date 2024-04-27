import { Module } from '@nestjs/common';
import { AuthMicroserviceService } from './auth-microservice.service';
import { AuthMicroserviceController } from './auth-microservice.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from '../common/guard/google-auth.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    /** Passport Strategy Module */
    PassportModule.register({ defaultStrategy: 'google' }),

    /** JWT Module */
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),

    /** RABBITMQ Module */
    ClientsModule.registerAsync([
      {
        name: 'AUTH_SERVICE',
        inject: [ConfigService],
        useFactory: async (config: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: config.get('RABBITMQ_URL'),
            queue: config.get('AUTH_QUEUE'),
            queueOptions: {
              durable: true,
            },
          },
        }),
      },
    ]),
  ],
  controllers: [AuthMicroserviceController],
  providers: [AuthMicroserviceService, ConfigService, GoogleStrategy],
  exports: [AuthMicroserviceService],
})
export class AuthMicroserviceModule {}
