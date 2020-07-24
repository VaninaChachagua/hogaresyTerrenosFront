import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const endpoint = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  localStorageService: any;
  constructor(private http: HttpClient) {
   }
  getUsuario(mail) {
    return this.http.get(endpoint + '/usuarios/' + mail).pipe(catchError(this.handleError<any>('getUsuarios')));
  }
  getUsuarioId(mail) {
    return this.http.get(endpoint + '/usuarioid/' + mail).pipe(catchError(this.handleError<any>('getUsuarios')));
  }
  getUsuarios() {
    this.localStorageService = localStorage;
    const headers = new HttpHeaders ({ token: this.localStorageService.tk });
    return this.http.get(endpoint + '/usuario' , {  headers }).pipe(catchError(this.handleError<any>('getUsuarios')));
  }
  postUsuario(nombre, apellido, email, telefono1, telalternativo, password, role) {
    // tslint:disable-next-line: max-line-length
    return this.http.post(endpoint + '/usuario', {nombre, apellido, email, telefono1, telalternativo, password, role} ).pipe(catchError(this.handleError<any>('usuario')));
  }
  putUsrInmueble(id, inmuebles) {
    console.log(inmuebles);
    // tslint:disable-next-line: max-line-length
    this.localStorageService = localStorage;
    const headers = new HttpHeaders ({ token: this.localStorageService.tk });
    // tslint:disable-next-line: max-line-length
    return this.http.put(endpoint + '/usuarioInmueble/' + id, {inmuebles}, {  headers } ).pipe(catchError(this.handleError<any>('usuarioInmueble')));
  }
  putUsuario(id, nombre, apellido, email, telefono1, telalternativo, role) {
    // tslint:disable-next-line: max-line-length
    this.localStorageService = localStorage;
    const headers = new HttpHeaders ({ token: this.localStorageService.tk });
    // tslint:disable-next-line: max-line-length
    return this.http.put(endpoint + '/usuario/' + id, {nombre, apellido, email, telefono1, telalternativo, role}, {  headers }).pipe(catchError(this.handleError<any>('usuario')));
  }
  deleteUsuario(id) {
    return this.http.delete(endpoint + '/usuario/' + id).pipe(catchError(this.handleError<any>('deleteUsuario')));
  }
  blanquearPwd(id) {
    return this.http.put(endpoint + '/usuario/blanquearClave/' + id, {}).pipe(catchError(this.handleError<any>('blanquearPwd')));
  }
  // mostrar errores en chrome
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(error);
      return of(result as T);
    };
  }
}
