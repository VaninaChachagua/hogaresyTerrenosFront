import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-editar-todosusr',
  templateUrl: './editar-todosusr.component.html',
  styleUrls: ['./editar-todosusr.component.css']
})
export class EditarTodosusrComponent implements OnInit {
  usuarios: any;
  textoBuscar: any;
  usuariosAMostrar: any;

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() {
    this.usuariosService.getUsuarios().subscribe(async data => {
      this.usuarios = data.usuarios;
      this.usuariosAMostrar = this.usuarios;
      console.log(this.usuarios);
      this.cargarEventoBusqueda();
    });
  }

  cargarEventoBusqueda() {
    document.getElementById('searchBar').onkeyup = e => {
      this.textoBuscar = e.target[`value`];
      if (this.textoBuscar.length === 0) {
        this.usuariosAMostrar = this.usuarios;
      } else {
        this.usuariosAMostrar = this.usuarios.filter(c =>
          Object.values(c).find((a: string) => a ? a.toString().toLowerCase().includes(this.textoBuscar.toLowerCase()) : null));
      }
    };
  }

  borrar(u) {
    // console.log(e.target);
    // let t = e.target;
    // while (t.tagName !== 'TR') {
    //   t = t.parentElement;
    // }
    // t.remove();
    if (confirm(`¿Está seguro que desea borrar a ${ u.nombre } ${ u.apellido }?`)) {
      // Save it!
      this.usuarios.filter(a => a._id === u._id)[0].estado = false;
      this.usuarios = this.usuarios.filter(a => a._id !== u._id);
      this.usuariosService.deleteUsuario(u._id).subscribe(data => {
        if (data.ok) {
          console.log('Thing was saved to the database.');
        }
      });
    } else {
      // Do nothing!
      console.log('Thing was not saved to the database.');
    }

  }

  cambiarValor(columna, usuario, e) {
    this.usuarios.filter(a => a._id === usuario._id)[0][columna] = e.target.outerText;
    document.getElementById(`saveButton${ usuario._id }`)[`disabled`] = false;
  }

  guardar(u) {
    this.usuariosService.putUsuario(u._id,
                                    u.nombre,
                                    u.apellido,
                                    u.email,
                                    u.telefono1,
                                    u.telalternativo,
                                    u.role).subscribe(data => {
      console.log(data);
    });
  }

  blanquearPwd(u) {
    if (confirm(`¿Está seguro que desea blanquear la contraseña de ${ u.nombre } ${ u.apellido }?`)) {
      // Save it!
      this.usuariosService.blanquearPwd(u._id).subscribe(data => {
        console.log(data);
        if (data.ok) {
          console.log('Thing was saved to the database.');
        }
      });
    } else {
      // Do nothing!
      console.log('Thing was not saved to the database.');
    }

  }
}