import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';

import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { InmueblesService } from '../../services/inmuebles.service';
import { ConsultasService } from '../../services/consultas.service';

@Component({
  selector: 'app-cargarusuario',
  templateUrl: './cargarusuario.component.html',
  styleUrls: ['./cargarusuario.component.css']
})
export class CargarusuarioComponent implements OnInit {
  constructor( private usuariosService: UsuariosService, private router: Router, private consultasService: ConsultasService) {
   }

  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};
  inmuebles: any;
  roleAdmin = true;
  admin = 'isAdminRole';
  idInmueblesSelec: any = [];

  ngOnInit() {
    this.consultarTodosInmuebles();
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
  crearUsuario() {
    const firstName = (document.getElementById('firstName' )as HTMLInputElement).value;
    const lastName = (document.getElementById('lastName' )as HTMLInputElement).value;
    const email = (document.getElementById('email' )as HTMLInputElement).value;
    const telefono1 = (document.getElementById('telefono1' )as HTMLInputElement).value;
    const telalternativo = (document.getElementById('telalternativo' )as HTMLInputElement).value;
    const password = (document.getElementById('password' )as HTMLInputElement).value;
    const role = (document.getElementById('role' )as HTMLInputElement).value;
    this.usuariosService.postUsuario(firstName, lastName, email, telefono1, telalternativo, password, role).subscribe(data => {
      if (data.ok) {
        window.alert('Tu usuario ha sido cargado con exito');
        this.actualizarDatoInm(data.usuario._id);
      } else {
        window.alert('Intente con otro mail');
      }
    });
    this.limpieza();
  }
  limpieza() {
    (document.getElementById('firstName' )as HTMLInputElement).value = '';
    (document.getElementById('lastName' )as HTMLInputElement).value = '';
    (document.getElementById('email' )as HTMLInputElement).value = '';
    (document.getElementById('telefono1' )as HTMLInputElement).value = '';
    (document.getElementById('telalternativo' )as HTMLInputElement).value = '';
    (document.getElementById('password' )as HTMLInputElement).value = '';
    (document.getElementById('role' )as HTMLInputElement).value = 'ADMIN_ROLE';
    this.selectedItems = [];
    this.roleAdmin = true;
  }

  actualizarDatoInm(id) {

    this.selectedItems.forEach(e => {
      this.idInmueblesSelec.push(e.item_id);
    });
    this.usuariosService.putUsrInmueble(id, this.idInmueblesSelec).subscribe(data => {
      if (data.ok) {
      }
    });
  }
  consultarTodosInmuebles() {
    this.consultasService.getInmuebles().subscribe(data => {
      if (data.ok) {
        this.inmuebles = data.inmueble;
        this.cargarDropdown();
      }
    });
  }
  onItemSelect(item: any) {
  }
  onSelectAll(items: any) {
  }
  cargarDropdown() {
    Object.keys(this.inmuebles).forEach(e => {
      // tslint:disable-next-line: max-line-length
      this.dropdownList.push({ item_id: this.inmuebles[e]._id, item_text: this.inmuebles[e].identificador });
  });
    this.dropdownList.sort((a, b) => (a.item_text < b.item_text) ? -1 : ((b.item_text < a.item_text) ? 1 : 0));
  }
  // Función para cambiar de estado la bandera y deshabilitar el cambio
  ifAdmin(event) {
    if (event.target.value === 'ADMIN_ROLE') {
      this.roleAdmin = true;
    } else {
      this.roleAdmin = false;
    }
  }

}
