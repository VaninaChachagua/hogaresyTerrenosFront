import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-editar-todosusr',
  templateUrl: './editar-todosusr.component.html',
  styleUrls: ['./editar-todosusr.component.css']
})
export class EditarTodosusrComponent implements OnInit {
  usuarios: any;

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() {
    this.usuariosService.getUsuarios().subscribe(async data => {
      this.usuarios = data.inmueble;
      console.log(data);
      });
  }

}
