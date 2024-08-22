import { Controller, Get, Post, Body, Render, Redirect } from '@nestjs/common';
import { TripService } from './trip.service';
import { error } from 'console';

@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Get('itinerary')
  @Render('itinerary')
  getItinerary() {
    const itinerary = this.tripService.getItinerary();
    return { itinerary };
  }

  @Post('edit')
  @Redirect('/trip/itinerary')
  editItinerary(@Body() body: any) {
    const { day, activities } = body;
    try {
      this.tripService.updateActivities(parseInt(day, 10), activities.split(',').map(activity => activity.trim()));
    } catch (error) {
      console.error(`Error editing itinerary: ${error.message}`);
    }
  }

  @Post('add-day')
  @Redirect('/trip/itinerary')
  addDay(@Body() body: any) {
    const { day, location, activities } = body;
    try {
      this.tripService.addDay(parseInt(day, 10), location, activities.split(',').map(activity => activity.trim()));
    } catch (error) {
      console.error(`Error adding day: ${error.message}`);
    }
  }

  @Post('add-activity') // Add this method
  @Redirect('/trip/itinerary')
  addActivity(@Body() body: any) {
    const { day, activity } = body;
    try {
      this.tripService.addActivity(parseInt(day, 10), activity.trim());
    } catch (error) {
      console.error(`Error adding activity: ${error.message}`);
    }
  }


  @Post('edit-activity')
  @Redirect('/trip/itinerary')
  editActivity(@Body() body: any) {
    const { day, activityIndex, newActivity } = body;
    try {
      this.tripService.editActivity(parseInt(day, 10), parseInt(activityIndex, 10), newActivity);
    } catch (error) {
      console.error(`Error editing activity: ${error.message}`);
    }
  }

  @Post('delete-activity')
  @Redirect('/trip/itinerary')
  deleteActivity(@Body() body: any) {
    const { day, activityIndexToDelete } = body;
    console.log(`Received request to delete activity. Day: ${day}, Activity Index: ${activityIndexToDelete}`);
  
    try {
      const parsedDay = parseInt(day, 10);
      const parsedActivityIndex = parseInt(activityIndexToDelete, 10);
  
      console.log(`Parsed Day: ${parsedDay}, Parsed Activity Index: ${parsedActivityIndex}`);
  
      if (isNaN(parsedDay) || isNaN(parsedActivityIndex)) {
        throw new Error(`Invalid day or activity index. Day: ${day}, Activity Index: ${activityIndexToDelete}`);
      }
  
      this.tripService.deleteActivity(parsedDay, parsedActivityIndex);
    } catch (error) {
      console.error(`Error deleting activity: ${error.message}`);
    }
  }

  @Post('delete-day')
  @Redirect('/trip/itinerary')
  deleteDay(@Body() body: any) {
    const { day } = body;
    try {
      this.tripService.deleteDay(parseInt(day, 10));
    } catch (error) {
      console.error(`Error deleting day: ${error.message}`);
    }
  }
}
