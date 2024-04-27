import { Test, TestingModule } from '@nestjs/testing';
import { HotelReservationMicroserviceService } from './hotel-reservation-microservice.service';

describe('HotelReservationMicroserviceService', () => {
  let service: HotelReservationMicroserviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotelReservationMicroserviceService],
    }).compile();

    service = module.get<HotelReservationMicroserviceService>(
      HotelReservationMicroserviceService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
