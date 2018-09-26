import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Station } from '../../classes/station';
import { StationService } from '../../services/station.service';

@Component({
    selector: 'app-top',
    templateUrl: './top.component.html',
    styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {
    stations: Station[];
    searchTimetable: {
        day: string
        direction: string
        station: string
    } = {
        day: 'weekday',
        direction: 'up',
        station: null
    };
    searchOperationTable: {
        day: string
        operationNumber: number
    } = {
        day: 'weekday',
        operationNumber: null
    };
    selected = false;

    constructor(
        private stationService: StationService,
        private router: Router
    ) {}

    getStations(): void {
        this.stationService
            .getStations()
            .subscribe(stations => (this.stations = stations));
    }

    test() {
        if (!this.selected) {
            this.searchTimetable.station = 'station';
        }
        this.router.navigate(['/Timetable', this.searchTimetable]);
    }

    ngOnInit() {
        this.getStations();
    }
}
