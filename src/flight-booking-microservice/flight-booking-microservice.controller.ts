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
  Put,
  UploadedFile,
  UseInterceptors,
  UploadedFiles,
  Patch,
  Query,
  Delete,
} from '@nestjs/common';
import { Response } from 'express';
import { catchError, map, Observable } from 'rxjs';
import { FlightBookingMicroserviceService } from './flight-booking-microservice.service';

import { AllGlobalExceptionsFilter } from '../common/filters/rpc-filter.filter';

import { JwtAuthGuard } from '../common/guard/jwt.guard';
import { RoleGuard } from '../common/guard/role.guard';
import { Roles } from '../common/decorator/roles.decorator';
import { Role } from '../common/interfaces/role.interface';
import {
  RetrieveBookingsDto,
  RetrievePlanesDto,
  CreatePlaneDto,
  UpdatePlaneDto,
  CreateBookingDto,
  BookingActionDto,
} from './dto/flight-booking.dto';

@Controller('booking')
@UseFilters(AllGlobalExceptionsFilter)
export class FlightBookingMicroserviceController {
  constructor(
    private readonly flightBookingMicroserviceService: FlightBookingMicroserviceService,
  ) {}

  @Post('create-plane')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  createPlane(
    @Body() createPlaneDto: CreatePlaneDto,
    @Res() res: Response,
    @Req() req: any,
  ): Observable<Response> {
    createPlaneDto.userId = req.user.user_id;
    return this.flightBookingMicroserviceService
      .createPlane(createPlaneDto)
      .pipe(
        catchError((error) => {
          throw new HttpException(error.message, error.status);
        }),
      )
      .pipe(
        map((resp) => {
          return res.status(201).json({
            message: 'Successfully created plane info!',
            data: resp,
          });
        }),
      );
  }

  @Patch('update-plane/:planeId')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  updatePlane(
    @Res() res: Response,
    @Req() req: any,
    @Param('planeId') planeId: string,
    @Body() updatePlaneDto: UpdatePlaneDto,
  ): Observable<Response> {
    updatePlaneDto.planeId = planeId;
    return this.flightBookingMicroserviceService
      .updatePlane(updatePlaneDto)
      .pipe(
        catchError((error) => {
          throw new HttpException(error.message, error.status);
        }),
      )
      .pipe(
        map((resp) => {
          return res.status(200).json({
            message: 'Successfully updated plane info!',
            data: resp,
          });
        }),
      );
  }

  @Get('retrieve-plane/:planeId')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  retrieveSinglePlane(
    @Res() res: Response,
    @Req() req: any,
    @Param('planeId') planeId: string,
  ): Observable<Response> {
    return this.flightBookingMicroserviceService
      .retrieveSinglePlane(planeId)
      .pipe(
        catchError((error) => {
          throw new HttpException(error.message, error.status);
        }),
      )
      .pipe(
        map((resp) => {
          return res.status(200).json({
            message: 'Successfully retrieved plane info!',
            data: resp,
          });
        }),
      );
  }

  @Get('retrieve-all-planes')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  retrieveAllPlanes(
    @Res() res: Response,
    @Req() req: any,
    @Query('batch') batch: string,
    @Query('limit') limit: string,
    @Query('search') search: string,
  ): Observable<Response> {
    function payload(): RetrievePlanesDto {
      return {
        batch: +batch,
        limit: +limit,
        search,
        userId: req.user.user_id,
      };
    }

    return this.flightBookingMicroserviceService
      .retrieveAllPlanes(payload())
      .pipe(
        catchError((error) => {
          throw new HttpException(error.message, error.status);
        }),
      )
      .pipe(
        map((resp) => {
          return res.status(200).json({
            message: 'Successfully retrieved all planes',
            data: resp,
          });
        }),
      );
  }

  @Delete('delete-plane/:planeId')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  deleteSinglePlane(
    @Res() res: Response,
    @Req() req: any,
    @Param('planeId') planeId: string,
  ): Observable<Response> {
    return this.flightBookingMicroserviceService
      .deleteSinglePlane(planeId)
      .pipe(
        catchError((error) => {
          throw new HttpException(error.message, error.status);
        }),
      )
      .pipe(
        map((resp) => {
          return res.status(200).json({
            message: 'Successfully deleted plane info!',
            data: resp,
          });
        }),
      );
  }

  @Post('create-booking')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.RWX_USER)
  createBooking(
    @Body() createBookingDto: CreateBookingDto,
    @Res() res: Response,
    @Req() req: any,
  ): Observable<Response> {
    createBookingDto.userId = req.user.user_id;
    return this.flightBookingMicroserviceService
      .createBooking(createBookingDto)
      .pipe(
        catchError((error) => {
          throw new HttpException(error.message, error.status);
        }),
      )
      .pipe(
        map((resp) => {
          return res.status(201).json({
            message: 'Successfully created flight booking!',
            data: resp,
          });
        }),
      );
  }

  @Get('retrieve-all-bookings')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.RWX_USER)
  retrieveAllBookings(
    @Res() res: Response,
    @Req() req: any,
    @Query('batch') batch: string,
    @Query('limit') limit: string,
    @Query('search') search: string,
    @Query('flag') flag: string,
    @Query('filterStartDate') filterStartDate: string,
    @Query('filterEndDate') filterEndDate: string,
  ): Observable<Response> {
    function payload(): RetrieveBookingsDto {
      return {
        batch: +batch,
        limit: +limit,
        search,
        flag,
        filterStartDate,
        filterEndDate,
        userId: req.user.user_id,
      };
    }

    return this.flightBookingMicroserviceService
      .retrieveAllBookings(payload())
      .pipe(
        catchError((error) => {
          throw new HttpException(error.message, error.status);
        }),
      )
      .pipe(
        map((resp) => {
          return res.status(200).json({
            message: 'Successfully retrieved all user flight bookings',
            data: resp,
          });
        }),
      );
  }

  @Get('retrieve-booking/:bookingId')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.RWX_USER)
  retrieveSingleBooking(
    @Res() res: Response,
    @Req() req: any,
    @Param('bookingId') bookingId: string,
  ): Observable<Response> {
    return this.flightBookingMicroserviceService
      .retrieveSingleBooking(bookingId)
      .pipe(
        catchError((error) => {
          throw new HttpException(error.message, error.status);
        }),
      )
      .pipe(
        map((resp) => {
          return res.status(200).json({
            message: 'Successfully retrieved flight booking info!',
            data: resp,
          });
        }),
      );
  }

  @Post('booking-action')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  bookingAction(
    @Res() res: Response,
    @Req() req: any,
    @Query('bookingId') bookingId: string,
    @Query('flag') flag: string,
    @Body('rejectionReason') rejectionReason?: string,
  ): Observable<Response> {
    function payload(): BookingActionDto {
      return {
        bookingId,
        flag,
        rejectionReason,
      };
    }
    return this.flightBookingMicroserviceService
      .bookingAction(payload())
      .pipe(
        catchError((error) => {
          throw new HttpException(error.message, error.status);
        }),
      )
      .pipe(
        map((resp) => {
          return res.status(200).json({
            message: 'Successfully performed booking action!',
            data: resp,
          });
        }),
      );
  }
}
