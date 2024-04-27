import { Test, TestingModule } from '@nestjs/testing';
import { HotelReservationMicroserviceController } from './hotel-reservation-microservice.controller';
import { HotelReservationMicroserviceService } from './hotel-reservation-microservice.service';

describe('HotelReservationMicroserviceController', () => {
  let controller: HotelReservationMicroserviceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotelReservationMicroserviceController],
      providers: [HotelReservationMicroserviceService],
    }).compile();

    controller = module.get<HotelReservationMicroserviceController>(
      HotelReservationMicroserviceController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
