import { Test, TestingModule } from '@nestjs/testing';
import { FlightBookingMicroserviceController } from './flight-booking-microservice.controller';
import { FlightBookingMicroserviceService } from './flight-booking-microservice.service';

describe('FlightBookingMicroserviceController', () => {
  let controller: FlightBookingMicroserviceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlightBookingMicroserviceController],
      providers: [FlightBookingMicroserviceService],
    }).compile();

    controller = module.get<FlightBookingMicroserviceController>(
      FlightBookingMicroserviceController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
