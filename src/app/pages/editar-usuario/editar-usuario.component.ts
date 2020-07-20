import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import {  ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  id: any;
  usuario: any;
  constructor(private usuariosService: UsuariosService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.usuariosService.getUsuarioId(this.id).subscribe(data => {
      if (data.ok) {
        this.usuario = data.inmueble;
        console.log(this.usuario);
        }
    });
  }
  actualizarUsuario() {
    const firstName = (document.getElementById('firstName' )as HTMLInputElement).value;
    const lastName = (document.getElementById('lastName' )as HTMLInputElement).value;
    const email = (document.getElementById('email' )as HTMLInputElement).value;
    const telefono1 = (document.getElementById('telefono1' )as HTMLInputElement).value;
    const telalternativo = (document.getElementById('telalternativo' )as HTMLInputElement).value;
    const password = (document.getElementById('password' )as HTMLInputElement).value;
    const role = (document.getElementById('role' )as HTMLInputElement).value;
    console.log(this.usuariosService);
    this.usuariosService.postUsuario(firstName, lastName, email, telefono1, telalternativo, password, role).subscribe(data => {
      if (data.ok) {
        window.alert('Tu usuario ha sido cargado con exito');
      } else{
        console.log(data);
        window.alert('Intente con otro mail');
      }
    });
  }

}
