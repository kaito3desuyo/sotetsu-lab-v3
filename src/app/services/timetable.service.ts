import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Station } from '../classes/station';
import { Trip } from '../classes/trip';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {
  constructor(private http: HttpClient) {}

  private stationUrl = 'http://localhost:3000/api/v1/stations/test';
  private tripUrl = 'http://localhost:3000/api/v1/trips';

  getStations(direction): Observable<Station[]> {
    let sortOrder;
    if (direction === 'up') {
      sortOrder = 'DESC';
    } else if (direction === 'down') {
      sortOrder = 'ASC';
    }
    return this.http.get<Station[]>(this.stationUrl, {
      params: {
        direction: direction,
        'order[]': ['Station.sortOrder,' + sortOrder]
      }
    });
  }

  getTrips(day, direction): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripUrl, {
      params: {
        day: day,
        direction: direction
      }
    });
  }

  getTimetableByStations(day, direction, stationId): Observable<Station[]> {
    let tripDirectionId;
    let calenderName;
    if (direction === 'up') {
      tripDirectionId = '0';
    } else if (direction === 'down') {
      tripDirectionId = '1';
    }

    if (day === 'weekday') {
      calenderName = '平日';
    } else if ((day = 'holiday')) {
      calenderName = '土休日';
    }
    return this.http.get<Station[]>(this.stationUrl, {
      params: {
        direction: direction,
        'include[Time][status]': 'true',
        'include[Time][Trip][status]': 'true',
        'include[Time][Trip][where][tripDirectionId]': tripDirectionId,
        'include[Time][Trip][Calender][status]': 'true',
        'include[Time][Trip][Calender][where][calenderName]': calenderName,
        'include[Time][Trip][Operation][status]': 'true',
        'include[Time][Trip][Time][status]': 'true',
        'include[Time][Trip][tripClass][status]': 'true',
        'where[id]': stationId,
        'order[]': [
          'Station.Time.departureTime,ASC',
          'Station.Time.Trip.TripTimes.stopSequence,ASC'
        ]
      }
    });
  }
}
