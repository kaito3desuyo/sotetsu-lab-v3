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

    private stationUrl = 'http://localhost:3000/api/v1/stations';
    private tripUrl = 'http://localhost:3000/api/v1/trips';

    getStations(direction): Observable<Station[]> {
        return this.http.get<Station[]>(this.stationUrl, {
            params: {
                direction: direction
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
}
