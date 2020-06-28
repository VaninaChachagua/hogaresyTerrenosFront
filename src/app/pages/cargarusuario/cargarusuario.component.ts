import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cargarusuario',
  templateUrl: './cargarusuario.component.html',
  styleUrls: ['./cargarusuario.component.css']
})
export class CargarusuarioComponent implements OnInit {

  constructor( private usuariosService: UsuariosService, private router: Router) { }

  ngOnInit() {
  }
  crearUsuario() {
    const firstName = (document.getElementById('firstName' )as HTMLInputElement).value;
    const lastName = (document.getElementById('lastName' )as HTMLInputElement).value;
    const email = (document.getElementById('email' )as HTMLInputElement).value;
    const telefono1 = (document.getElementById('telefono1' )as HTMLInputElement).value;
    const telalternativo = (document.getElementById('telalternativo' )as HTMLInputElement).value;
    const password = (document.getElementById('password' )as HTMLInputElement).value;
    const role = (document.getElementById('role' )as HTMLInputElement).value;
    console.log(this.usuariosService);
    this.usuariosService.postUsuario(firstName, lastName, email, telefono1, telalternativo, password, role).subscribe(data => {
      if(data.ok) {
        window.alert('Tu usuario ha sido cargado con exito');
      } else{
        console.log(data);
        window.alert('Intente con otro mail');
      }
    });
  }

}
