import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TripService {
  private readonly filePath = path.resolve(__dirname, '.\itinerary.json');
  private itinerary: Array<{ day: number; location: string; activities: string[] }> = [];

  constructor() {
    this.loadItinerary();
  }

  private loadItinerary() {
    if (fs.existsSync(this.filePath)) {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      this.itinerary = JSON.parse(data);
    } else {
      // Initial default data if file does not exist
      this.itinerary = [
        { day: 1, location: 'Tokyo', activities: ['test1', 'test2'] },
      ];
      this.saveItinerary();
    }
  }

  private saveItinerary() {
    console.log(`saving... `, this.itinerary);
    fs.writeFileSync(this.filePath, JSON.stringify(this.itinerary, null, 2), 'utf-8');
    console.log (__dirname);
  }

  getItinerary() {
    return this.itinerary;
  }

  updateActivities(day: number, activities: string[]) {
    const dayItinerary = this.itinerary.find(d => d.day === day);
    if (dayItinerary) {
      dayItinerary.activities = activities;
      this.saveItinerary();
    } else {
      throw new Error(`Day ${day} not found in itinerary`);
    }
  }

  addDay(day: number, location: string, activities: string[]) {
    if (this.itinerary.find(d => d.day === day)) {
      throw new Error(`Day ${day} already exists in the itinerary`);
    }

    const newDay = { day, location, activities };
    this.itinerary.push(newDay);
    this.itinerary.sort((a, b) => a.day - b.day);
    this.saveItinerary();
  }

  editDay(oldDay: number, newDay: number, location: string, activities: string[]) {
    const dayItinerary = this.itinerary.find(d => d.day === oldDay);
    if (dayItinerary) {
      dayItinerary.day = newDay;
      dayItinerary.location = location;
      dayItinerary.activities = activities;

      // Sort to maintain day order
      this.itinerary.sort((a, b) => a.day - b.day);
      this.saveItinerary();
    } else {
      throw new Error(`Day ${oldDay} not found in itinerary`);
    }
  }

  addActivity(day: number, activity: string) {
    const dayItinerary = this.itinerary.find(d => d.day === day);
    if (dayItinerary) {
      dayItinerary.activities.push(activity);
      this.saveItinerary();
    } else {
      throw new Error(`Day ${day} not found in itinerary`);
    }
  }

  editActivity(day: number, activityIndex: number, newActivity: string) {
    const dayEntry = this.itinerary.find(d => d.day === day);
    if (dayEntry && activityIndex >= 0 && activityIndex < dayEntry.activities.length) {
      dayEntry.activities[activityIndex] = newActivity;
      this.saveItinerary();
    } else {
      throw new Error(`Activity index ${activityIndex} not found for day ${day}`);
    }
  }

  deleteActivity(day: number, activityIndex: number) {
    const dayEntry = this.itinerary.find(d => d.day === day);
    if (dayEntry && !isNaN(activityIndex) && activityIndex >= 0 && activityIndex < dayEntry.activities.length) {
      dayEntry.activities.splice(activityIndex, 1);
      this.saveItinerary();
    } else {
      throw new Error(`Invalid day or activity index. Day: ${day}, Activity Index: ${activityIndex}`);
    }
  }

  deleteDay(day: number) {
    this.itinerary = this.itinerary.filter(d => d.day !== day);
    this.saveItinerary();
  }
}
