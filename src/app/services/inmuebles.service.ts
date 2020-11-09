import { Injectable } from '@angular/core';

import { HttpClient , HttpHeaders} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { EnvironmentConfigService } from './environment-config.service';

let endpoint = '';

@Injectable({
  providedIn: 'root'
})
export class InmueblesService {
  localStorageService: any;

  constructor(private http: HttpClient, private environmentConfigService: EnvironmentConfigService) {
    this.environmentConfigService.currentIP.subscribe(data => { endpoint = data; });
    this.localStorageService = localStorage;
  }
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
  putInmueble(id, identificador, precio, moneda, direccion, barrio, descripcion, cantHab, tipoInmueble, tipoVenta, usuario) {
    const headers = new HttpHeaders ({ token: this.localStorageService.tk });
    // tslint:disable-next-line: max-line-length
    return this.http.put(endpoint + '/inmueble/' + id, {identificador, precio, moneda, direccion, barrio, descripcion, cantHab, tipoInmueble, tipoVenta, usuario}, {  headers }).pipe(catchError(this.handleError<any>('inmueble')));
  }
  deleteInmueble(id) {
    const headers = new HttpHeaders ({ token: this.localStorageService.tk });
    // tslint:disable-next-line: max-line-length
    return this.http.delete(endpoint + '/inmueble/' + id, {  headers } ).pipe(catchError(this.handleError<any>('getInmueble')));
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
  uploadImage(images: FileList, id) {
    const formData = new FormData();
    Array.from(images).forEach(image => {
      console.log(image);
      formData.append('archivo', image);
      console.log(formData);
    });
    console.log(formData);
    return this.http.put(endpoint + '/upload/inmuebles/' + id, formData).pipe(catchError(this.handleError<any>('inmueble')));
  }
  // uploadArchivos(image: File, id) {
    uploadArchivos(images: FileList, tipo, id) {
    const formDat = new FormData();
    Array.from(images).forEach(image => {
      console.log(image);
      formDat.append('archivo', image);
    });
    console.log(formDat);
    // return this.http.put(endpoint + '/uploadarchivos/' + id, formData).pipe(catchError(this.handleError<any>('inmueble')));
    return this.http.put(endpoint + '/uploadarchivos/' + tipo + '/' + id, formDat).pipe(catchError(this.handleError<any>('inmueble')));
  }
  borrarArchivos(id, tipo, nombreArchivo) {
    return this.http.put(endpoint + `/upload/borrarArchivos/${ id }/${ tipo }/${ nombreArchivo }`, {})
    .pipe(catchError(this.handleError<any>('inmueble')));
  }
}
