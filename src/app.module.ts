import { Module } from '@nestjs/common';
import { TripModule } from './trip/trip.module';
import { TripController } from './trip/trip.controller';

@Module({
  imports: [TripModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
