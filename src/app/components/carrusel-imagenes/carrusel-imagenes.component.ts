import { Component, OnInit, Input } from '@angular/core';
import { ConsultasService } from '../../services/consultas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrusel-imagenes',
  templateUrl: './carrusel-imagenes.component.html',
  styleUrls: ['./carrusel-imagenes.component.css']
})
export class CarruselImagenesComponent implements OnInit {
  imagenInmueble: any = [];
  inmuebles: any = [];

  @Input() imagenesInmueble: any = [];

  constructor(private router: Router) {  }

  ngOnInit() {
    this.convertirArray();
    if (window.location.pathname === '/home') {
      setTimeout(() => {
        console.log( document.querySelector('#mostrar'));
        document.querySelector('#mostrar')[`style`].cursor = 'pointer';
      }, 1);
      }
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
  iraInm(id) {
    if (window.location.pathname === '/home') {
      this.router.navigate([`detalleInmueble/${id}`]);
    }
  }
}
