import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const endpoint = 'http://localhost:3000';

@Injectable({providedIn: 'root'})

export class ConsultasService {

  constructor(private http: HttpClient) { }
  getInmuebles() {
    return this.http.get(endpoint + '/inmueble').pipe(catchError(this.handleError<any>('getInmueble')));
  }
  // mostrar errores en chrome
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(error);
      return of(result as T);
    };
  }
}
