import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { Vehicle } from '../classes/vehicle';
import { DbSort } from '../classes/db-sort';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  private vehicleUrl = 'http://localhost:3000/api/v1/vehicles';

  findAll(filter?: any, sort?: DbSort): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.vehicleUrl, {
      params: {
        sortColumn: sort ? sort.sortColumn : '',
        sortDirection: sort ? sort.sortDirection : ''
      }
    });
  }

  bulkCreate(data: Vehicle[]): Observable<string | {}> {
    return this.http.post<any>(this.vehicleUrl, data).pipe(
      tap(result => {
        alert(result.message);
      }),
      catchError(
        this.errorService.handleError(
          'bulkCreate',
          'データの追加に失敗しました。'
        )
      )
    );
  }
}
