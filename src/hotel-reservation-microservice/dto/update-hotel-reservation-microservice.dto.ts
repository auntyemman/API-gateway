import { PartialType } from '@nestjs/mapped-types';
import { CreateReservationDto } from './create-reservation.dto';

export class UpdateHotelReservationMicroserviceDto extends PartialType(
  CreateReservationDto,
) {
  id: number;
}
