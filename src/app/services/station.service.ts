import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Station } from '../classes/station';
import { STATIONS } from '../mocks/stations';

@Injectable({
    providedIn: 'root'
})
export class StationService {
    constructor(private http: HttpClient) {}

    private Url = 'http://localhost:3000/api/v1/stations';

    getStations(): Observable<Station[]> {
        return this.http.get<Station[]>(this.Url);
    }
}
