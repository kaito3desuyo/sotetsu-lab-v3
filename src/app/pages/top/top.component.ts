import { Component, OnInit } from '@angular/core';

import { Station } from '../../classes/station';
import { StationService } from '../../services/station.service';

@Component({
    selector: 'app-top',
    templateUrl: './top.component.html',
    styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {
    stations: Station[];

    constructor(private stationService: StationService) {}

    getStations(): void {
        this.stationService
            .getStations()
            .subscribe(stations => (this.stations = stations));
    }

    ngOnInit() {
        this.getStations();
    }
}
