import { PartialType } from '@nestjs/mapped-types';
import { UserRefreshTokenDto } from './refresh-token.dto';

export class UpdateUserRefreshTokenDto extends PartialType(
  UserRefreshTokenDto,
) {}
