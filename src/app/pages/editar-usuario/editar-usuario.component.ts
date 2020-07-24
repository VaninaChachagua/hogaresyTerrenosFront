import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import {  ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  idUsr: any;
  usuario: any;
  constructor(private usuariosService: UsuariosService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.idUsr = this.route.snapshot.paramMap.get('id');
    this.usuariosService.getUsuarioId(this.idUsr).subscribe(data => {
      if (data.ok) {
        this.usuario = data.usuarioBD;
        console.log('Encontré usuario');
        console.log(data);
        }
    });
  }
  actualizarUsuario() {
    const firstName = (document.getElementById('firstName' )as HTMLInputElement).value;
    const lastName = (document.getElementById('lastName' )as HTMLInputElement).value;
    const email = this.usuario.email;
    const telefono1 = (document.getElementById('telefono1' )as HTMLInputElement).value;
    const telalternativo = (document.getElementById('telalternativo' )as HTMLInputElement).value;
    const role = this.usuario.role;
    this.usuariosService.putUsuario(this.idUsr, firstName, lastName, email, telefono1, telalternativo, role).subscribe(data => {
      if (data.ok) {
        window.alert('Tu usuario ha sido cargado con exito');
      } else{
        console.log(data);
        window.alert('Intente con otro mail');
      }
    });
  }

}
