export class CreateReservationDto {
  hotelId: string;
  guestId: string;
  checkInDate: Date;
  checkOutDate: Date;
  roomType: string;
  roomNumber: string;
}
