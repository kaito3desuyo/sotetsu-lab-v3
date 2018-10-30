import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Vehicle } from 'src/app/classes/vehicle';
import { MatTableDataSource, MatSort } from '@angular/material';
import { DbSort } from 'src/app/classes/db-sort';

@Component({
  selector: 'app-manage-vehicle',
  templateUrl: './manage-vehicle.component.html',
  styleUrls: ['./manage-vehicle.component.css']
})
export class ManageVehicleComponent implements OnInit, AfterViewInit {
  findData: Vehicle[];

  displayedColumns: string[] = [
    'id',
    'vehicleNumber',
    'isScrapped',
    'scrappedDate'
  ];

  sendData: Vehicle[] = [
    {
      vehicleNumber: null,
      isScrapped: false,
      scrappedDate: null
    }
  ];

  constructor(private vehicleService: VehicleService) {}

  @ViewChild(MatSort)
  sort: MatSort;

  add() {
    this.sendData.push({
      vehicleNumber: null,
      isScrapped: false,
      scrappedDate: null
    });
  }

  send() {
    console.log(this.sendData);
    this.vehicleService.bulkCreate(this.sendData).subscribe(result => {
      console.log(result);
    });
  }

  get(filter?: any, sort?: DbSort) {
    this.vehicleService
      .findAll(filter, sort)
      .subscribe(vehicles => (this.findData = vehicles));
  }

  ngOnInit() {
    this.get();
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => {
      this.get(null, {
        sortColumn: this.sort.active,
        sortDirection: this.sort.direction
      });
    });
  }
}
