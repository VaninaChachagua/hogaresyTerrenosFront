import { Component, OnInit } from '@angular/core';
import { InmueblesService } from '../../services/inmuebles.service';

@Component({
  selector: 'app-cargarinmueble',
  templateUrl: './cargarinmueble.component.html',
  styleUrls: ['./cargarinmueble.component.css']
})
export class CargarinmuebleComponent implements OnInit {

  constructor( private inmueblesService: InmueblesService) { }

  ngOnInit() {
  }
  crearInmueble(){
    const identificador = (document.getElementById('identificador') as HTMLInputElement).value;
    const precio = (document.getElementById('precio') as HTMLInputElement).value;
    const moneda = (document.getElementById('moneda') as HTMLInputElement).value;
    const direccion = (document.getElementById('direccion') as HTMLInputElement).value;
    const barrio = (document.getElementById('barrio') as HTMLInputElement).value;
    const descripcion = (document.getElementById('descripcion') as HTMLInputElement).value;
    const cantHab = (document.getElementById('cantHab') as HTMLInputElement).value;
    const tipoInmueble = (document.getElementById('tipoInmueble') as HTMLInputElement).value;
    const tipoVenta = (document.getElementById('tipoVenta') as HTMLInputElement).value;
    const usuario = '5eb9d75c1d3f7c3efc86bfd7';

    // tslint:disable-next-line: max-line-length
    this.inmueblesService.postInmueble(identificador, precio, moneda, direccion, barrio, descripcion, cantHab, tipoInmueble, tipoVenta, usuario).subscribe(data => {
      if (data.ok) {
        window.alert('Tu inmueble ha sido cargado con exito');
      } else {
        console.log(data);
        window.alert('Error, intente de nuevo');
      }
    });
  }

}
