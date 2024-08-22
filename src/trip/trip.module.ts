import { Module } from '@nestjs/common';
import { TripService } from './trip.service';
import { TripController } from './trip.controller';
import { RedirectController } from 'src/redirect/redirect.controller';

@Module({
  imports: [TripModule],
  providers: [TripService],
  controllers: [TripController, RedirectController]
})
export class TripModule {}
