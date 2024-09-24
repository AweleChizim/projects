import { Module } from '@nestjs/common';
import { FlightsModule } from './flights/flights.module';
import { HotelsModule } from './hotels/hotels.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, FlightsModule, HotelsModule],
})
export class UserInformationModule {}
