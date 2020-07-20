import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { InmueblesService } from '../../services/inmuebles.service';
import { UsuariosService } from '../../services/usuarios.service';
import { ConsultasService } from '../../services/consultas.service';

@Component({
  selector: 'app-informacion-adicional',
  templateUrl: './informacion-adicional.component.html',
  styleUrls: ['./informacion-adicional.component.css']
})
export class InformacionAdicionalComponent implements OnInit {
  user: any;
  inmuebles: any;
  inmuebleSeleccionado: any;

  // tslint:disable-next-line: max-line-length
  constructor(private loginService: LoginService, private inmueblesService: InmueblesService , private usuariosService: UsuariosService, private consultasService: ConsultasService) { }

  ngOnInit() {
    this.obtenerIdUsuario();
    if (this.inmuebleSeleccionado) {
      console.log('existe');
    } else {
      console.log('No ta');
    }
  }

  async obtenerIdUsuario() {
    this.loginService.obtenerInfoPorTk().subscribe(data => {
      if (data.ok) {
        this.user = data.dec;
        if (this.user.role === 'ADMIN_ROLE') {
          this.obtenerInmuebles();
        } else {
          this.obtenerInmueblesPorUsuario();
        }
        console.log(this.user);
      }
    });
  }

  obtenerInmueblesPorUsuario() {
    this.usuariosService.getUsuarioId(this.user._id).subscribe(data => {
      this.inmuebles = data.inmueble;
      this.inmuebles.sort((a, b) => (a.identificador > b.identificador) ? 1 : ((b.identificador > a.identificador) ? -1 : 0));
      this.inmuebleSeleccionado = this.inmuebles[0]._id;
      console.log(this.inmuebleSeleccionado);
    });
  }

  async obtenerInmuebles() {
    this.consultasService.getInmuebles().subscribe(data => {
      this.inmuebles = data.inmueble;
      this.inmuebles.sort((a, b) => (a.identificador > b.identificador) ? 1 : ((b.identificador > a.identificador) ? -1 : 0));
      this.inmuebleSeleccionado = this.inmuebles[0]._id;
      console.log(this.inmuebleSeleccionado);
    });
  }
  obtenerInmuebleSeleccionado(e) {
    console.log('Evento');
    console.log(e.value);
    this.inmuebleSeleccionado = e.value;
  }

}
