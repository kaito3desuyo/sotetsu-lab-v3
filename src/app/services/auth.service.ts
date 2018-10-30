import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, tap, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../classes/user';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  isLoggedIn = false;
  redirectUrl: string;

  result: {
    status: boolean;
    message: string;
    data: User[];
  } = {
    status: false,
    message: null,
    data: null
  };

  url = 'http://localhost:3000/api/v1/users/auth';

  login(manageId: string, managePassword: string): Observable<{}> {
    return this.http
      .get<User[]>(this.url, {
        params: {
          manageId: manageId,
          managePassword: managePassword
        }
      })
      .pipe(
        tap(result => {
          this.isLoggedIn = true;
          this.result = {
            status: true,
            message: 'ok',
            data: result
          };
        }),
        catchError(
          this.errorService.handleError(
            'login',
            'ログインできませんでした。\n管理IDか管理パスワードが間違っています。'
          )
        )
      );
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
