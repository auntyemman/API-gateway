import { Module } from '@nestjs/common';
import { HotelReservationMicroserviceService } from './hotel-reservation-microservice.service';
import { HotelReservationMicroserviceController } from './hotel-reservation-microservice.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [HotelReservationMicroserviceController],
  providers: [HotelReservationMicroserviceService, ConfigService],
  exports: [HotelReservationMicroserviceService],
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
        name: 'HOTEL_RESERVATION_SERVICE',
        inject: [ConfigService],
        useFactory: async (config: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: config.get('RABBITMQ_URL'),
            queue: config.get('HOTEL_QUEUE'),
            queueOptions: {
              durable: true,
            },
          },
        }),
      },
    ]),
  ],
})
export class HotelReservationMicroserviceModule {}
