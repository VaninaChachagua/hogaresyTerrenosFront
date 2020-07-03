import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrusel-imagenes',
  templateUrl: './carrusel-imagenes.component.html',
  styleUrls: ['./carrusel-imagenes.component.css']
})
export class CarruselImagenesComponent implements OnInit {
  imagenesInmueble: any;

  constructor() { }

  ngOnInit() {
  }
  buscarImagenes(){
    //Función para buscar el listado de imagenes del inmuebles y enviarlas al front
  }

}
