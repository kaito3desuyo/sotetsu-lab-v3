import { Component, OnInit } from '@angular/core';
import { TimetableService } from '../../services/timetable.service';
import { Station } from 'src/app/classes/station';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-timetable-by-station',
  templateUrl: './timetable-by-station.component.html',
  styleUrls: ['./timetable-by-station.component.css']
})
export class TimetableByStationComponent implements OnInit {
  stations: Station[];
  times: {
    hour: Number;
    trains: String[];
  }[];
  params: {
    day: string
    direction: string
    station: string
  } = {
    day: null,
    direction: null,
    station: null
  };
  constructor(private route: ActivatedRoute, private timetableService: TimetableService) { }

  getTimetables(day: string, direction: string, stationId: string): void {
    this.timetableService
        .getTimetableByStations(day, direction, stationId)
        .subscribe(stations => {
          this.stations = stations;
          this.times = [];

          let flag = false;
          for (let i = 4; i < 24; i++) {
            const trains = [];
            for (const time of stations[0].Times) {
              if (!time.departureTime) {
                break;
              }
              const timeStr = this.convertTime(time.departureTime, 'H');
              if (Number(timeStr) === i) {
                trains.push(time);
              }
            }
            this.times.push({hour: i, trains: trains});
            if (flag === false && i === 23) {
              i = -1;
              flag = true;
            } else if (flag === true && i === 3) {
              break;
            }
          }
          console.log(this.stations);
          console.log(this.times);
        });
  }

  convertTime(time, formatStr): string {
    const timeStr = moment('2018-09-27 ' + time).format(formatStr);
    return timeStr;
  }

  overTimeCheck(days, time): string {
    const now = moment().unix();
    const today = moment().format('YYYY-MM-DD');
    const checkTime = moment(today + ' ' + time).add(days, 'days').unix();
    if (now < checkTime) {
      return '';
    } else {
      return 'rgba(0,0,0,0.1)';
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.params = {
          day: params.get('day'),
          direction: params.get('direction'),
          station: params.get('station')
      };
    });
    this.getTimetables(this.params.day, this.params.direction, this.params.station);
  }

}
