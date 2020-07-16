import { Component, OnInit, Input } from '@angular/core';
import { ConsultasService } from '../../services/consultas.service';

@Component({
  selector: 'app-carrusel-imagenes',
  templateUrl: './carrusel-imagenes.component.html',
  styleUrls: ['./carrusel-imagenes.component.css']
})
export class CarruselImagenesComponent implements OnInit {
  imagenInmueble: any = [];
  inmuebles: any = [];

  @Input() imagenesInmueble: any = [];

  constructor() {  }

  ngOnInit() {
    this.convertirArray();
  }

  convertirArray() {
    // this.inmueble.forEach(element => {
    //   this.imagenesInmueble.push (element);
    // });
    Object.keys(this.imagenesInmueble).forEach(e => {
      // tslint:disable-next-line: max-line-length
      this.imagenInmueble.push({ identificador: this.imagenesInmueble[e].identificador, img: this.imagenesInmueble[e].img[0], cantidad: this.imagenesInmueble[e].visitas });
    });
  }
}