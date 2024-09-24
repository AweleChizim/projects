export class CreateHotelDto {
  readonly hotelName: string;
  readonly roomNo: string;
  readonly price: number;
  readonly checkInDateTime: Date;
  readonly checkOutDateTime: Date;
}
