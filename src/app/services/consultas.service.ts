import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { EnvironmentConfigService } from './environment-config.service';

let endpoint = '';

@Injectable({providedIn: 'root'})

export class ConsultasService {

  constructor(private http: HttpClient, private environmentConfigService: EnvironmentConfigService) {
    this.environmentConfigService.currentIP.subscribe(data => { endpoint = data; });
   }
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
