import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const endpoint = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }
  getUsuario(mail) {
    return this.http.get(endpoint + '/usuarios/' + mail).pipe(catchError(this.handleError<any>('getUsuarios')));
  }
  postUsuario(nombre, apellido, email, telefono1, telalternativo, password, role) {
    // tslint:disable-next-line: max-line-length
    return this.http.post(endpoint + '/usuario', {nombre, apellido, email, telefono1, telalternativo, password, role}).pipe(catchError(this.handleError<any>('usuario')));
  }
  // mostrar errores en chrome
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(error);
      return of(result as T);
    };
  }
}
