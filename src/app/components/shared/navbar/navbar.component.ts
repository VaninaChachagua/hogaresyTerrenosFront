import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {
  role: any;
  name: any;
  idUsr: any;
  localStorage: any;

  constructor(private loginService: LoginService,  private router: Router) {
    this.obtenerRole();
    this.localStorage = localStorage;
  }

  ngOnInit() {
  }

  obtenerRole() {
    this.loginService.obtenerInfoPorTk().subscribe(data => {
      if (data.ok) {
        this.name = data.dec.nombre;
        this.role = data.dec.role;
        console.log(data.dec);
        this.idUsr = data.dec._id;
      } else {
        this.role = null;
      }
    });
  }
  iniciarSesion() {
    this.router.navigate([`/login`]);
  }
  cerrarSesion() {
    this.localStorage.removeItem('tk');
    window.open(`/home`, '_self');
  }
  editarDatosMiCuenta() {
    // llamar página editar
    this.router.navigate([`/editarUsuario/${ this.idUsr }`]);
  }
  agregarNuevoUsuario() {
    this.router.navigate([`/cargarUsuario`]);
  }
  editarUsuarios() {
    // llamar a editar
    this.router.navigate([`/editarTodos`]);
  }
}
