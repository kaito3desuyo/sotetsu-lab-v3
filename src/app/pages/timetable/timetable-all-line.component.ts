import { Component, OnInit } from '@angular/core';
import { TimetableService } from '../../services/timetable.service';
import { Station } from '../../classes/station';
import { Trip } from '../../classes/trip';
import { ActivatedRoute, ParamMap } from '@angular/router';

import * as moment from 'moment';
import { PageEvent } from '@angular/material';

@Component({
    selector: 'app-timetable-all-line',
    templateUrl: './timetable-all-line.component.html',
    styleUrls: [
        './timetable-all-line.component.css',
        './../../../assets/fonts/DiaPro-web/DiaPro.css'
    ]
})
export class TimetableAllLineComponent implements OnInit {
    constructor(
        private timetableService: TimetableService,
        private route: ActivatedRoute
    ) {}
    stations: Station[];
    trips: Trip[];
    params: {
        day: string
        direction: string
        station: string
    } = {
        day: null,
        direction: null,
        station: null
    };
    paginator: {
        length: number
        pageSize: number
        pageSizeOptions: number[]
        pageEvent: PageEvent
    } = {
        length: 100,
        pageSize: 10,
        pageSizeOptions: [10, 20, 40],
        pageEvent: {
            length: 100,
            pageSize: 10,
            pageIndex: 0
        }
    };
    getStations(direction: string): void {
        this.timetableService
            .getStations(direction)
            .subscribe(stations => (this.stations = stations));
    }

    getTrips(day: string, direction: string): void {
        this.timetableService.getTrips(day, direction).subscribe(trips => {
            this.trips = trips;
            this.paginator.length = trips.length;
        });
    }

    convertTime(time): string {
        const timeStr = moment('2018-09-27 ' + time).format('HHmm');
        if (timeStr.length === 4 && timeStr.slice(0, 1) === '0') {
            return '-' + timeStr.slice(1, 4);
        } else {
            return timeStr;
        }
    }

    classChecker(tripClass, upperSide, downnerSide, nowNum): string {
        // 方向により値を変える
        let start;
        let end;
        if (this.params.direction === 'up') {
            start = downnerSide;
            end = upperSide;
        } else if (this.params.direction === 'down') {
            start = upperSide;
            end = downnerSide;
        }
        const pass = '↓';
        const noRun = '‥';
        const noVia = '|';
        let output: string = null;
        // 通過駅設定
        switch (tripClass) {
            case '特急':
                switch (true) {
                    case 1 < nowNum && nowNum < 10:
                    case 10 < nowNum && nowNum < 14:
                    case 14 < nowNum && nowNum < 17:
                    case 17 < nowNum && nowNum < 21:
                    case 21 < nowNum && nowNum < 25:
                        output = pass;
                        break;
                }
                break;
            case '急行':
                switch (true) {
                    case 1 < nowNum && nowNum < 10:
                        output = pass;
                        break;
                    case 10 < nowNum && nowNum < 18:
                        output = noRun;
                        break;
                }
                break;
            case '快速':
                switch (true) {
                    case 1 < nowNum && nowNum < 5:
                        output = pass;
                        break;
                    case 5 < nowNum && nowNum < 9:
                        output = pass;
                        break;
                }
        }
        // 発駅設定
        switch (start) {
            case '横浜':
                break;
            case '西横浜':
                switch (true) {
                    case 1 <= nowNum && nowNum < 3:
                        output = noRun;
                        break;
                }
                break;
            case '星川':
                switch (true) {
                    case 1 <= nowNum && nowNum < 5:
                        output = noRun;
                        break;
                }
                break;
            case '西谷':
                switch (true) {
                    case 1 <= nowNum && nowNum < 8:
                        output = noRun;
                        break;
                }
                break;
            case '二俣川':
                switch (true) {
                    case 1 <= nowNum && nowNum < 10:
                        output = noRun;
                        break;
                }
                break;
            case '瀬谷':
                switch (true) {
                    case 1 <= nowNum && nowNum < 20:
                        output = noRun;
                        break;
                }
                break;
            case '大和':
                switch (true) {
                    case 1 <= nowNum && nowNum < 21:
                        output = noRun;
                        break;
                }
                break;
            case '相模大塚':
                switch (true) {
                    case 1 <= nowNum && nowNum < 22:
                        output = noRun;
                        break;
                }
                break;
            case 'かしわ台':
                switch (true) {
                    case 1 <= nowNum && nowNum < 24:
                        output = noRun;
                        break;
                }
                break;

            case 'いずみ野':
                switch (true) {
                    case 1 <= nowNum && nowNum < 14:
                        output = noRun;
                        break;
                }
                break;
        }

        // 着駅設定
        switch (end) {
            case '西横浜':
                switch (true) {
                    case 3 < nowNum && nowNum <= 26:
                        output = noRun;
                        break;
                }
                break;
            case '星川':
                switch (true) {
                    case 5 < nowNum && nowNum <= 26:
                        output = noRun;
                        break;
                }
                break;
            case '西谷':
                switch (true) {
                    case 8 < nowNum && nowNum <= 26:
                        output = noRun;
                        break;
                }
                break;
            case '二俣川':
                switch (true) {
                    case 10 < nowNum && nowNum <= 26:
                        output = noRun;
                        break;
                }
                break;
            case '瀬谷':
                switch (true) {
                    case 20 < nowNum && nowNum <= 26:
                        output = noRun;
                        break;
                }
                break;
            case '大和':
                switch (true) {
                    case 21 < nowNum && nowNum <= 26:
                        output = noRun;
                        break;
                }
                break;
            case '相模大塚':
                switch (true) {
                    case 22 < nowNum && nowNum <= 26:
                        output = noRun;
                        break;
                }
                break;
            case 'かしわ台':
                switch (true) {
                    case 24 < nowNum && nowNum <= 26:
                        output = noRun;
                        break;
                }
                break;
            case '海老名':
                switch (true) {
                    case 25 < nowNum && nowNum <= 26:
                        output = noRun;
                        break;
                }
                break;
            case '厚木':
                switch (true) {
                    case nowNum === 25:
                        output = noVia;
                        break;
                }
                break;
            case 'いずみ野':
                switch (true) {
                    case 14 < nowNum && nowNum <= 26:
                        output = noRun;
                        break;
                }
                break;
            case '湘南台':
                switch (true) {
                    case 17 < nowNum && nowNum <= 26:
                        output = noRun;
                        break;
                }
                break;
        }

        // 経由関係
        switch (start) {
            case '横浜':
            case '西横浜':
            case '星川':
            case '西谷':
            case '二俣川':
                switch (end) {
                    case '瀬谷':
                    case '大和':
                    case '相模大塚':
                    case 'かしわ台':
                    case '海老名':
                    case '厚木':
                        switch (true) {
                            case 11 <= nowNum && nowNum <= 17:
                                output = noVia;
                                break;
                        }
                        break;
                    case 'いずみ野':
                    case '湘南台':
                        switch (true) {
                            case 18 <= nowNum && nowNum <= 26:
                                output = noRun;
                                break;
                        }
                }
        }
        return output;
    }

    ngOnInit() {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.params = {
                day: params.get('day'),
                direction: params.get('direction'),
                station: params.get('station')
            };
        });
        this.getStations(this.params.direction);
        this.getTrips(this.params.day, this.params.direction);
    }
}
