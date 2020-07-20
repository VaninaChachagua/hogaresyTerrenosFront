import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const endpoint = 'http://localhost:3000';

@Injectable({providedIn: 'root'})

export class LoginService {

  constructor(private http: HttpClient) { }
  loginAuthentication(email, password) {
    return this.http.post(endpoint + '/login', {email, password}).pipe(catchError(this.handleError<any>('login')));
  }
  // mostrar errores en chrome
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(error);
      return of(result as T);
    };
  }
  obtenerInfoPorTk() {
    const tk = localStorage.getItem('tk');
    return this.http.get(endpoint + '/obtenerInfoPorTk/' + tk).pipe(catchError(this.handleError<any>('obtenerInfoPorTk')));
  }
}
