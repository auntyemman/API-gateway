export class BookingActionDto {
  bookingId: string;
  flag: string;
  rejectionReason?: string;
}

export class CreateBookingDto {
  readonly flightNumber: string;
  readonly departureAirportCode: string;
  readonly arrivalAirportCode: string;
  readonly departureDate: string;
  readonly arrivalDate: string;
  readonly planeId: string;
  userId: string;
}

export class CreatePlaneDto {
  readonly manufacturer?: string;
  readonly model?: string;
  readonly capacity?: string;
  readonly registrationNumber?: string;
  userId: string;
}

export class UpdatePlaneDto extends CreatePlaneDto {
  planeId: string;
}

export class RetrievePlanesDto {
  batch?: number;
  limit?: number;
  search?: string;
  userId: string;
}

export class RetrieveBookingsDto extends RetrievePlanesDto {
  flag: string;
  filterStartDate?: string;
  filterEndDate?: string;
}
