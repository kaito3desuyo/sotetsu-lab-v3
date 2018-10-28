import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Station } from '../classes/station';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  constructor(private http: HttpClient) {}

  private Url = 'http://localhost:3000/api/v1/stations/test';

  getStations(direction: string, sortColumn: string): Observable<Station[]> {
    return this.http.get<Station[]>(this.Url, {
      params: {
        direction: direction,
        'include[Route][status]': 'true',
        'order[]': ['Station.Route.sortOrder,ASC', 'Station.sortOrder,ASC']
      }
    });
  }
}
