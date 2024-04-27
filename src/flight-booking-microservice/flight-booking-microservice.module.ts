import { Module } from '@nestjs/common';
import { FlightBookingMicroserviceService } from './flight-booking-microservice.service';
import { FlightBookingMicroserviceController } from './flight-booking-microservice.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [FlightBookingMicroserviceController],
  providers: [FlightBookingMicroserviceService, ConfigService],
  exports: [FlightBookingMicroserviceService],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    ClientsModule.registerAsync([
      {
        name: 'FLIGHT_BOOKING_SERVICE',
        inject: [ConfigService],
        useFactory: async (config: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: config.get('RABBITMQ_URL'),
            queue: 'flight_booking_microservice',
            queueOptions: {
              durable: true,
            },
          },
        }),
      },
    ]),
  ],
})
export class FlightBookingMicroserviceModule {}
