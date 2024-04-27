import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map, Observable } from 'rxjs';
import { PublisherPattern } from 'src/common/interfaces/publisher-pattern.enum';
import {
  CreatePlaneDto,
  UpdatePlaneDto,
  RetrieveBookingsDto,
  RetrievePlanesDto,
  CreateBookingDto,
  BookingActionDto,
} from './dto/flight-booking.dto';

@Injectable()
export class FlightBookingMicroserviceService {
  constructor(
    @Inject('FLIGHT_BOOKING_SERVICE')
    private readonly clientFlightBookingService: ClientProxy,
  ) {}

  private readonly ISE: string = 'Internal server error';

  createPlane(createPlaneDto: CreatePlaneDto): Observable<any> {
    try {
      return this.clientFlightBookingService.send<any>(
        { cmd: PublisherPattern.CREATE_PLANE },
        createPlaneDto,
      );
    } catch (error) {
      throw new HttpException(
        error?.message ? error.message : this.ISE,
        error?.status ? error.status : 500,
      );
    }
  }

  updatePlane(updatePlaneDto: UpdatePlaneDto): Observable<any> {
    try {
      return this.clientFlightBookingService.send<any>(
        { cmd: PublisherPattern.UPDATE_PLANE },
        updatePlaneDto,
      );
    } catch (error) {
      throw new HttpException(
        error?.message ? error.message : this.ISE,
        error?.status ? error.status : 500,
      );
    }
  }

  retrieveSinglePlane(planeId: string): Observable<any> {
    try {
      return this.clientFlightBookingService.send<any>(
        { cmd: PublisherPattern.RETRIEVE_PLANE },
        planeId,
      );
    } catch (error) {
      throw new HttpException(
        error?.message ? error.message : this.ISE,
        error?.status ? error.status : 500,
      );
    }
  }

  retrieveAllPlanes(retrievePlanesDto: RetrievePlanesDto): Observable<any> {
    try {
      return this.clientFlightBookingService.send<any>(
        { cmd: PublisherPattern.RETRIEVE_ALL_PLANES },
        retrievePlanesDto,
      );
    } catch (error) {
      throw new HttpException(
        error?.message ? error.message : this.ISE,
        error?.status ? error.status : 500,
      );
    }
  }

  deleteSinglePlane(planeId: string): Observable<any> {
    try {
      return this.clientFlightBookingService.send<any>(
        { cmd: PublisherPattern.DELETE_PLANE },
        planeId,
      );
    } catch (error) {
      throw new HttpException(
        error?.message ? error.message : this.ISE,
        error?.status ? error.status : 500,
      );
    }
  }

  createBooking(createBookingDto: CreateBookingDto): Observable<any> {
    try {
      return this.clientFlightBookingService.send<any>(
        { cmd: PublisherPattern.CREATE_BOOKING },
        createBookingDto,
      );
    } catch (error) {
      throw new HttpException(
        error?.message ? error.message : this.ISE,
        error?.status ? error.status : 500,
      );
    }
  }

  retrieveAllBookings(
    retrieveBookingsDto: RetrieveBookingsDto,
  ): Observable<any> {
    try {
      return this.clientFlightBookingService.send<any>(
        { cmd: PublisherPattern.RETRIEVE_ALL_BOOKINGS },
        retrieveBookingsDto,
      );
    } catch (error) {
      throw new HttpException(
        error?.message ? error.message : this.ISE,
        error?.status ? error.status : 500,
      );
    }
  }

  retrieveSingleBooking(bookingId: string): Observable<any> {
    try {
      return this.clientFlightBookingService.send<any>(
        { cmd: PublisherPattern.RETRIEVE_BOOKING },
        bookingId,
      );
    } catch (error) {
      throw new HttpException(
        error?.message ? error.message : this.ISE,
        error?.status ? error.status : 500,
      );
    }
  }

  bookingAction(bookingActionDto: BookingActionDto): Observable<any> {
    try {
      return this.clientFlightBookingService.send<any>(
        { cmd: PublisherPattern.BOOKING_ACTION },
        bookingActionDto,
      );
    } catch (error) {
      throw new HttpException(
        error?.message ? error.message : this.ISE,
        error?.status ? error.status : 500,
      );
    }
  }
}
