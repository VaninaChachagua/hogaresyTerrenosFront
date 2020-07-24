import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ConsultasService } from '../../services/consultas.service';

@Component({
  selector: 'app-editar-todosusr',
  templateUrl: './editar-todosusr.component.html',
  styleUrls: ['./editar-todosusr.component.css']
})
export class EditarTodosusrComponent implements OnInit {
  usuarios: any;
  textoBuscar: any;
  usuariosAMostrar: any;
  dropdownList = [];
  selectedItems = {};
  dropdownSettings: IDropdownSettings = {};

  constructor(private usuariosService: UsuariosService, private consultasService: ConsultasService) { }

  ngOnInit() {
    this.usuariosService.getUsuarios().subscribe(async data => {
      this.usuarios = data.usuarios;
      this.usuariosAMostrar = this.usuarios;
      console.log(this.usuarios);
      this.cargarEventoBusqueda();
      this.consultasService.getInmuebles().subscribe(dataC => {
        const inmuebles = dataC.inmueble;
        inmuebles.forEach(inm => {
          console.log({ item_id: inm._id, item_text: inm.identificador });
          this.dropdownList.push({ item_id: inm._id, item_text: inm.identificador });
        });
        this.dropdownList.sort((a, b) => (a.item_text < b.item_text) ? -1 : ((b.item_text < a.item_text) ? 1 : 0));
        this.usuarios.forEach(u => {
          console.log(u);
          if (u.inmueble) {
            u.inmueble.forEach(i => {
              console.log(i);
              // this.selectedItems[u._id] = this.dropdownList.filter(a => a.item_id === i);
              this.selectedItems[u._id] ? this.selectedItems[u._id] = this.dropdownList.filter(a => a.item_id === i) :
                this.selectedItems[u._id].push(this.dropdownList.filter(a => a.item_id === i));
              this.cargarMultiselect();

            });
          }
        });
      });
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
    this.usuarios.filter(a => a._id === usuario._id)[0][columna] = e.target.value;
    document.getElementById(`saveButton${ usuario._id }`)[`disabled`] = false;
    console.log(this.usuarios);
  }

  guardar(u) {
    const inmuebles = [];
    if (this.selectedItems[u._id]) {
    this.selectedItems[u._id].forEach(e => {
      inmuebles.push(e.item_id);
    });
    this.usuariosService.putUsrInmueble(u._id, inmuebles).subscribe(data => {
      console.log(data);
    });
  }
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

  cargarMultiselect() {
    setTimeout(() => {
      document.querySelectorAll('.dropdown-btn').forEach(e => {
        e[`style`].padding = 0;
      });
    }, 1);
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onItemSelect(u) {
    document.getElementById(`saveButton${ u._id }`)[`disabled`] = false;
    console.log(u);
  }
  onSelectAll(u) {
    document.getElementById(`saveButton${ u._id }`)[`disabled`] = false;
    console.log(u);
  }

}
