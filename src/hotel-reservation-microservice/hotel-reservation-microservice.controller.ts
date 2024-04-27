import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  UseFilters,
  HttpException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Response } from 'express';
import { catchError, map, Observable } from 'rxjs';
import { HotelReservationMicroserviceService } from './hotel-reservation-microservice.service';
import { AllGlobalExceptionsFilter } from '../common/filters/rpc-filter.filter';
import { JwtAuthGuard } from '../common/guard/jwt.guard';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { RoleGuard } from '../common/guard/role.guard';
import { Roles } from '../common/decorator/roles.decorator';
import { Role } from '../common/interfaces/role.interface';

@Controller('hotel')
@UseFilters(AllGlobalExceptionsFilter)
export class HotelReservationMicroserviceController {
  constructor(
    private readonly hotelReservationMicroserviceService: HotelReservationMicroserviceService,
  ) {}

  @Post('create-reservation')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.RWX_USER)
  createReservation(
    @Body() createReservationDto: CreateReservationDto,
    @Res() res: Response,
    @Req() req: any,
  ): Observable<Response> {
    createReservationDto.guestId = req.user.user_id;

    return this.hotelReservationMicroserviceService
      .createReservation(createReservationDto)
      .pipe(
        catchError((error) => {
          throw new HttpException(error.message, error.status);
        }),
      )
      .pipe(
        map((resp) => {
          return res.status(201).json({
            message: 'Successfully created new hotel reservation!',
            data: resp,
          });
        }),
      );
  }

  @Get('retrieve-reservation/:reservationId')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  retrieveReservation(
    @Res() res: Response,
    @Req() req: any,
    @Param('reservationId') reservationId: string,
  ): Observable<Response> {
    return this.hotelReservationMicroserviceService
      .retrieveReservation(reservationId)
      .pipe(
        catchError((error) => {
          throw new HttpException(error.message, error.status);
        }),
      )
      .pipe(
        map((resp) => {
          return res.status(200).json({
            message: 'Successfully retrieved hotel reservation!',
            data: resp,
          });
        }),
      );
  }
}
