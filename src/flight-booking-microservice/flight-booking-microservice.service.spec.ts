import { Test, TestingModule } from '@nestjs/testing';
import { FlightBookingMicroserviceService } from './flight-booking-microservice.service';

describe('FlightBookingMicroserviceService', () => {
  let service: FlightBookingMicroserviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlightBookingMicroserviceService],
    }).compile();

    service = module.get<FlightBookingMicroserviceService>(
      FlightBookingMicroserviceService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
