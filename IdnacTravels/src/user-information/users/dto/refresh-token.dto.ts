import { IsString } from 'class-validator';

export class UserRefreshTokenDto {
  @IsString()
  tokenName: string;
}
