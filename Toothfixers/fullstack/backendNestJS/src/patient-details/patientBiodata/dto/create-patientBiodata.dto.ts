export class CreatePatientDto {
  readonly NIN: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly middleName?: string;
  readonly dateOfBirth: Date;
  readonly homeAddress?: string;
  readonly dateOfRegistration: Date;
  readonly _22120612972?: boolean;
}
