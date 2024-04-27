import { Test, TestingModule } from '@nestjs/testing';
import { AuthMicroserviceController } from './auth-microservice.controller';
import { AuthMicroserviceService } from './auth-microservice.service';

describe('AuthMicroserviceController', () => {
  let controller: AuthMicroserviceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthMicroserviceController],
      providers: [AuthMicroserviceService],
    }).compile();

    controller = module.get<AuthMicroserviceController>(
      AuthMicroserviceController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
