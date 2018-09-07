import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Station } from '../classes/station';
import { STATIONS } from '../mocks/stations';

@Injectable({
    providedIn: 'root'
})
export class StationService {
    constructor() {}

    getStations(): Observable<Station[]> {
        return of(STATIONS);
    }
}
