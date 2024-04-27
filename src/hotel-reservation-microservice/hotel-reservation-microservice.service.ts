import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { PublisherPattern } from 'src/common/interfaces/publisher-pattern.enum';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class HotelReservationMicroserviceService {
  constructor(
    @Inject('HOTEL_RESERVATION_SERVICE')
    private readonly clientHotelReservationService: ClientProxy,
  ) {}

  private readonly ISE: string = 'Internal server error';

  createReservation(
    createReservationDto: CreateReservationDto,
  ): Observable<any> {
    try {
      return this.clientHotelReservationService.send<any>(
        { cmd: PublisherPattern.CREATE_RESERVATION },
        createReservationDto,
      );
    } catch (error) {
      throw new HttpException(
        error?.message ? error.message : this.ISE,
        error?.status ? error.status : 500,
      );
    }
  }

  retrieveReservation(reservationId: string): Observable<any> {
    try {
      return this.clientHotelReservationService.send<any>(
        { cmd: PublisherPattern.RETRIEVE_RESERVATION },
        reservationId,
      );
    } catch (error) {
      throw new HttpException(
        error?.message ? error.message : this.ISE,
        error?.status ? error.status : 500,
      );
    }
  }
}
