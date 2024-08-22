import { Controller, Get, Redirect } from '@nestjs/common';

@Controller()
export class RedirectController {
  @Get()
  @Redirect('/trip/itinerary', 302)
  redirect() {
    // Optionally add any logic here if needed
  }
}
