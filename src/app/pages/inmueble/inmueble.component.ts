
import { Component, OnInit } from '@angular/core';
// Para tomar los valores de los parámetros
import { ActivatedRoute, Router } from '@angular/router';
import { InmueblesService } from '../../services/inmuebles.service';
import { LoginService } from '../../services/login.service';


@Component({
    selector: 'app-inmueble',
    templateUrl: './inmueble.component.html',
    styleUrls: ['./inmueble.component.css']
})
export class InmuebleComponent implements OnInit {

  inmueble: any = {};
  imagenesInmueble: any = [];
  localStorage: any;
  role: any;

  constructor( private activatedRoute: ActivatedRoute,
               // tslint:disable-next-line: variable-name
               private _inmueblesService: InmueblesService, private router: Router, private loginService: LoginService) {
  }

  ngOnInit() {
    this.localStorage = localStorage;
    // Me suscribo al observable
    this.activatedRoute.params.subscribe( params => {

      this._inmueblesService.putVisitas(params[`id`]).subscribe();
      // tslint:disable-next-line: no-string-literal
      this._inmueblesService.getInmueble(params['id']).subscribe(data => {
         this.inmueble = data.inmueble;
         console.log(this.inmueble);
         this.imagenes();
        });
    });
    this.obtenerRole();
  }
  mail() {
    const para = this.inmueble.usuario.email;
    const subject = `Consulta por: ${this.inmueble.identificador} ${window.location.href}`;
    const bodyMail = (document.getElementById('bodyMail') as HTMLInputElement).value ;
    // tslint:disable-next-line: max-line-length
    const mailArmador = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${para}&su=${subject}&body=${bodyMail}`;
    window.open(mailArmador, '_blank');
  }
  imagenes() {
    // Función para buscar el listado de imagenes del inmuebles y enviarlas al front
    const cant = 3;
    Object.keys(this.inmueble.img).forEach(e => {
      // tslint:disable-next-line: max-line-length
      this.imagenesInmueble.push({ identificador: this.inmueble.identificador, img: this.inmueble.img[e]});
    });
  }
  cargarArchivos() {
    this.router.navigate([`/cargarArchivos/${ this.inmueble._id }`]);
  }
  editarInmueble() {
    this.router.navigate([`/editarInmueble/${ this.inmueble._id }`]);
  }
  eliminar() {
    // window.confirm('¿Está seguro que desea eliminar éste inmueble?');
    if (confirm('¿Está seguro que desea eliminar éste inmueble?')) {
      // Save it!
      console.log('Thing was saved to the database.');
      // deleteInmueble
      this._inmueblesService.deleteInmueble(this.inmueble._id).subscribe(inmBorrado => {
        if (inmBorrado.ok == true) {
          console.log('Inmueble Borrado con éxito');
          console.log(inmBorrado);
          window.alert('Inmueble borrado con éxito');
        } else {
          console.log('Error');
          console.log(inmBorrado);
          window.alert('No se pudo eliminar el inmueble');
        }
       });
    } else {
      // Do nothing!
      console.log('Thing was not saved to the database.');
    }
  }
  obtenerRole() {
    this.loginService.obtenerInfoPorTk().subscribe(data => {
      if (data.ok) {
        this.role = data.dec.role;
        console.log(data.dec);
      } else {
        this.role = null;
      }
    });
  }
}
