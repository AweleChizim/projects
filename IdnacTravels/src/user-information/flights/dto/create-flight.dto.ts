export class CreateFlightDto {
  readonly airlineName: string;
  readonly flightNo: string;
  readonly price: number;
  readonly departureAirport: string;
  readonly arrivalAirport: string;
  readonly departureDateTime: Date;
  readonly arrivalDateTime: Date;
}
