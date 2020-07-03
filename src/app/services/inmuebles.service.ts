import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const endpoint = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class InmueblesService {

  constructor(private http: HttpClient) { }
  // getInmuebleMail(mail) {
  //   return this.http.get(endpoint + '/inmueble/' + mail).pipe(catchError(this.handleError<any>('getInmueble')));
  // }
  getInmueble(id) {
    return this.http.get(endpoint + '/inmueble/' + id).pipe(catchError(this.handleError<any>('getInmueble')));
  }
  postInmueble(identificador, precio, moneda, direccion, barrio, descripcion, cantHab, tipoInmueble, tipoVenta, usuario) {
    // tslint:disable-next-line: max-line-length
    return this.http.post(endpoint + '/inmueble', {identificador, precio, moneda, direccion, barrio, descripcion, cantHab, tipoInmueble, tipoVenta, usuario}).pipe(catchError(this.handleError<any>('inmueble')));
  }
  putVisitas(id) {
    return this.http.put(endpoint + '/inmueble/visitas/' + id, {}).pipe(catchError(this.handleError<any>('inmueble')));
  }
  // mostrar errores en chrome
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(error);
      return of(result as T);
    };
  }
}
